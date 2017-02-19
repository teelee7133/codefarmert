# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
if not SECRET_KEY:
    SECRET_KEY = '#*mi=ldm3yx(@nv58(70sra^2anku3+71f%$t^l0#czxxkt4jn'


EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'



if DEBUG:

    from django.contrib.staticfiles import views as staticfiles_views
    from django.views import static

    WEB_BUILD_ROOT = config('WEB_BUILD_ROOT', 'web/build/')
    WEB_DIST_ROOT = config('WEB_DIST_ROOT', 'codefarmert')

    _old_staticfiles_serve = staticfiles_views.serve

    def dev_staticfiles_serve_wrapper(fn):
        def inner(request, path, **kwargs):
            if DEBUG:
                if path.startswith(WEB_DIST_ROOT):
                    path = path[len(WEB_DIST_ROOT):].lstrip('/')
                    return static.serve(request, path, document_root=WEB_BUILD_ROOT, )
            return fn(request, path, **kwargs)

        return inner

    staticfiles_views.serve = dev_staticfiles_serve_wrapper(_old_staticfiles_serve)

try:
    from .local import *
except ImportError:
    pass
