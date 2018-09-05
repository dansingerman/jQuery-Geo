This is a simple jQuery plugin to encapsulate a bunch of geolocation functionality.

# Usage

## 1 - Locate user

```javascript
$.geo("locate", successFunction, failureFunction);
```

e.g.

```javascript
$.geo("locate",function(position){
  // returns object of type Position
  // see http://dev.w3.org/geo/api/spec-source.html#position_interface
  $("#result").html("your location is " + position.coords.latitude + ", " + position.coords.longitude);
},
function(error, message){
  // returns error object of type PositionError
  // see http://dev.w3.org/geo/api/spec-source.html#position_error_interface
  // and human readable message in text
  $("#result").html(message);
});
```

## 2 - Measure distance between two locations (in metres)

```javascript
$.geo("distance", lat1 , lon1 , lat2 , lon2 );
```

e.g.

```javascript
var distance = $.geo("distance", 40.748383 , -73.98555 , 40.782374 , -73.96553 );
```
