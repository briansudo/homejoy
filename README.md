Homejoy Takehome Test
=======

Quick Blurb: Here's my takehome test! I used the Python Shapefile Library (Fiona had a problem with dependencies on my computer)
to extract information from the zipped archive of zipcodes. Using Google's Geocoder feature as part of its Maps API, I obtained the
latitude and longtitude of two addresses, A and B. Using Shapely, I then created a LineString between A and B and, then, for
each zipcode in the extraction, I created a polygon out of the zipcode's points and used Shapely's ```object.intersect(obj2)``` method
to determine if the zipcode was along the path of the straight line between A and B. If it were, I added the zipcode and its points
to Python dictionary ```{zip_code: [{'lat':...,'long':...},{..},...]}``` that is obtained as a JSON Object when the endpoint
```/get-intersections/Along,Alat/Blong,Blat/``` is hit. On the front end, I parsed through this JSON and drew the intersecting
polygons onto the map. For the line between A and B, I used Google's polyline tool. As you can see below, the polyline tool
accounts for the curvature of the Earth, so the line doesn't always travel through the zipcode areas obtained from their
intersection with a line that doesn't account for the curvature of the Earth.

Side Note: I apologize for the lack of aesthetics or possibly some rushed and not well-thought out code you may find in the repo. I was quite busy
over the past couple of days and was only able to spend about a half a day on this.

Technologies used: Google Maps API, Shapely, Python Shapefile Library, Django, Bootstrap, Font Awesome

Heroku had an issue with the geos_c library, you can check it out here: http://homejoy.herokuapp.com
