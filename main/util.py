import shapefile
from shapely.geometry import LineString, Polygon

def get_shapes(file_name="main/shape_files/cb_2013_us_zcta510_500k"):
    sf = shapefile.Reader(file_name)
    return sf.shapeRecords()

def create_shortest_line(start, end):
    return LineString([start, end])

def get_intersecting_shapes(start=(-122.4042,37.7929), end=(-122.147963,37.402453)):

    intersections = {}

    shapeRecs = get_shapes()
    shortest_line = create_shortest_line(start, end)

    for shapeRec in shapeRecs:
        zip_code = shapeRec.record[0]
        points = shapeRec.shape.points
        polygon = Polygon(points)
        if shortest_line.intersects(polygon):
            list_of_lat_lng = []
            for point in points:
                list_of_lat_lng.append({'long': point[0], 'lat': point[1]})
            intersections[zip_code] = list_of_lat_lng 
    return intersections




