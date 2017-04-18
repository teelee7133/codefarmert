# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

import django

from codefarmert.settings.base import *


if not SECRET_KEY:
    SECRET_KEY = '#*mi=ldm3yx(@nv58(70sra^2anku3+71f%$t^l0#czxxkt4jn'

# Borrowed from pytest-django etc, allow no migration to speed up test
class DisableMigrations(object):

    def __init__(self):
        self._django_version = django.VERSION

    def __contains__(self, item):
        return True

    def __getitem__(self, item):
        if self._django_version >= (1, 9):
            return None
        else:
            return 'notmigrations'


MIGRATION_MODULES=DisableMigrations()
