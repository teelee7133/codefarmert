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



class BaseGridBlock(blocks.StructBlock):

    heading = blocks.CharBlock()
    description = blocks.RichTextBlock()
    background_image = ImageChooserBlock()

    class Meta:
        template = 'blocks/base_grid.html'


class PageGridBlock(BaseGridBlock):

    page = blocks.PageChooserBlock()

    class Meta:
        template = 'blocks/page_grid.html'


class URLGridBlock(BaseGridBlock):

    url = blocks.URLBlock()

    class Meta:
        template = 'blocks/url_grid.html'


class GridHomePage(Page):

    summary = RichTextField(blank=True)
    background_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    body = StreamField([
        ('page', PageGridBlock()),
        ('url', URLGridBlock()),
    ])


    content_panels = Page.content_panels + [
        ImageChooserPanel('background_image'),
        FieldPanel('summary'),
        StreamFieldPanel('body'),
    ]
