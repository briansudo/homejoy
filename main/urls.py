from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'habito_testbed.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', 'main.views.index', name='index'),
    url(r'^get-intersections/(?P<start>.+)/(?P<end>.+)/$', 'main.views.get_polygons', name='get-polygons'),
)
