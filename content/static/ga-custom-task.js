
(function () {

  var cleanValueFn = (function () {
    var replaceFieldFnGenerator = function (options) {
      return function (match, p1Field, p2, p3Value){
        return (p1Field + '[REDACTED ' + options.ruleName +  ']')
      }
    }

    var replaceEmailFn = function (match) {
        return '[REDACTED EMAIL]'
    }

    var piiRegex = [{
      regex: /([^&\/\?=]+(@|%40)[\w]+\.([\w](\.[\w.])*)+)/gi,
      replaceFn: replaceEmailFn
    },{
      regex: /((tel=)|(telephone=)|(phone=)|(mobile=)|(mob=))([\d\+\s][^&\/\?]+)/gi,
      replaceFn: replaceFieldFnGenerator({ruleName: 'TEL'})
    },{
      regex: /((firstname=)|(lastname=)|(surname=))([^&\/\?]+)/gi,
      replaceFn: replaceFieldFnGenerator({ruleName: 'NAME'})
    },{
      regex: /((password=)|(passwd=)|(pass=))([^&\/\?]+)/gi,
      replaceFn: replaceFieldFnGenerator({ruleName: 'PASSWORD'})
    },{
      regex: /((postcode=)|(zipcode=)|(zip=))([^&\/\?]+)/gi,
      replaceFn: replaceFieldFnGenerator({ruleName: 'ZIP'})
    }]

    return function (value){

      piiRegex.forEach(function(pii) {
        if (value.match(pii.regex)) {
          value = value.replace(pii.regex, pii.replaceFn);
        }
      })
      return value;
    }
  })();


  return function(model) {
    try {
      var originalSendHitTask = model.get('sendHitTask');

      var newSentHitTask = function(sendModel) {
        var hitPayload, data;
        hitPayload = sendModel.get('hitPayload');

        // split the payload data into key value pair
        data = (hitPayload).split("&").reduce(
          function(resultValue, currentValue) {
            var pair = currentValue.split("=");
            resultValue[pair[0]] = pair[1];
            return resultValue
          },
          {}
        );

        // clean each datapoint
        for(var key in data){
          var val = decodeURIComponent(data[key]);
          data[key] = encodeURIComponent(cleanValueFn(val));
        };

        // join all the payload back
        hitPayload = Object.keys(data).map(function(key) { return (key) + '=' + (data[key]); }).join('&');
        sendModel.set('hitPayload', hitPayload, true);
        return originalSendHitTask(sendModel);
      };


      model.set('sendHitTask', newSentHitTask);

    } catch (e) {};

  };

})
