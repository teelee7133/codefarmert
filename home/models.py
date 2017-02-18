# -*- coding: utf-8 -*-

from django.db import models

from modelcluster.fields import ParentalKey

from wagtail.wagtailcore import blocks
from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField, StreamField
from wagtail.wagtailadmin.edit_handlers import FieldPanel, StreamFieldPanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtailimages.blocks import ImageChooserBlock
from wagtail.wagtailsearch import index


class HomePage(Page):

    body = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('body', classname="full"),
    ]



class PageGridBlock(blocks.StructBlock):

    heading = blocks.CharBlock(),
    description = blocks.RichTextBlock()
    background_image = ImageChooserBlock()
    page = blocks.PageChooserBlock()

    class Meta:
        template = 'blocks/page_grid.html'


class GridHomePage(Page):

    body = StreamField([
        ('page', PageGridBlock())
    ])

    content_panels = Page.content_panels + [
        StreamFieldPanel('body')
    ]
