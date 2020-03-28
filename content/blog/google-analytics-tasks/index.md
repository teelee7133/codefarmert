---
title: Google Analytics Tasks
date: "2020-02-01T22:12:03.284Z"
description: "Google Analytic Tasks"
---

Today I am trying to work out how to prevent some sensitive data being
sent to Google Analytics.

There are two execellent posts on this topic:

*   [How to Remove PII from Google Analytics – the smart way!](https://brianclifton.com/blog/2017/09/07/remove-pii-from-google-analytics/)
*   [#GTMTips: Remove PII From Google Analytics Hits ](https://www.simoahava.com/gtm-tips/remove-pii-google-analytics-hits/)

A task is basically a function which takes a `model` argument.  The `model` is a tracker object
which sending analytic data to google via the
[Google Analytic Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/).

The gist of the whole operation is to customise something called a `customTask`,
one of the preprocessing tasks google analytics script
runs before sending the data to google analytics servers.  In the `customTask`, we modify a `sendHitTask` so to
intercept the payload for the *Measurement Protocal*, stored in `hitPayload` variable.

Example payloads for measurement protocal:
```

v=1&tid=UA-XXXXX-Y&cid=555&t=pageview&dp=%2Fhome
v=1&tid=UA-XXXXX-Y&cid=555&t=pageview&dp=%2Fabout
v=1&tid=UA-XXXXX-Y&cid=555&t=pageview&dp=%2Fcontact

```

We can then manipulate the payload at our heart's desire before it get sent to Google Analytics.