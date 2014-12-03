Homejoy Takehome Test
=======

Quick Blurb
-------
Here's my takehome test! I used the Python Shapefile Library (Fiona had a problem with dependencies on my computer)
to extract information from the zipped archive of zipcodes. Using Google's Geocoder feature as part of its Maps API, I obtained the
latitude and longtitude of two addresses, A and B. Using Shapely, I then created a LineString between A and B and, then, for
each zipcode in the extraction, I created a polygon out of the zipcode's points and used Shapely's ```object.intersect(obj2)``` method
to determine if the zipcode was along the path of the straight line between A and B. If it were, I added the zipcode and its points
to Python dictionary ```{zip_code: [{'lat':...,'long':...},{..},...]}``` that is obtained as a JSON Object when the endpoint
```/get-intersections/Along,Alat/Blong,Blat/``` is hit. On the front end, I parsed through this JSON and drew the intersecting
polygons onto the map. For the line between A and B, I used Google's polyline tool. As you can see below, the polyline tool
accounts for the curvature of the Earth, so the line doesn't always travel through the zipcode areas obtained from their
intersection with a line that doesn't account for the curvature of the Earth.

Where Further Improvements Can Be Made
-------
1. Improve Algorithm - Currently, I am creating polygons for every zipcode. However, if we can "sort" the zip codes and consider only a subset of all the zipcodes by having a heuristic that determines if the zipcode is likely in the line's path, we can reduce the amount of time creating polygons and determining intersections.
2. Implement a RESTful API like protocol for ```get-intersections```.
3. Implement Part C, which is basically using Google Directions and plotting that
4. Improve the aesthetics, such as creatively displaying the zipcodes, instead of using commas and spaces
5. Improve code quality
6. etc.

Side Note
---------
I apologize for the lack of aesthetics or possibly some rushed and not well-thought out code you may find in the repo. I was quite busy
over the past couple of days and was only able to spend about a half a day on this.

Technologies used
-----
Google Maps API, Shapely, Python Shapefile Library, Django, Bootstrap, Font Awesome, jQuery (incl. AJAX)

Heroku had an issue with the geos_c library. Otherwise, you would have been able to have a live demo straight from a URL. You can check out that issue here: http://homejoy.herokuapp.com

Images
-----
![](https://github.com/briansudo/homejoy/blob/master/ex1.png)
580 California St San Francisco CA 94104 to 3333 Coyote Hill Rd, Palo Alto, CA 94304

![](https://github.com/briansudo/homejoy/blob/master/ex2.png)
580 California St San Francisco CA 94104 to new york
