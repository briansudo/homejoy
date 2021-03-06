from django.shortcuts import render
from django.http import HttpResponse
import main.util as util
import json

def index(request):
    return render(request, 'main/index.html', {})

def get_polygons(request, start="-122.4042,37.7929", end="-122.147963,37.402453"):
    start = tuple([float(x) for x in start.split(",")])
    end = tuple([float(y) for y in end.split(",")])
    intersections = util.get_intersecting_shapes(start, end)
    return HttpResponse(json.dumps(intersections), content_type='application/json')

