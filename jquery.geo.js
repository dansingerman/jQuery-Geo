/*!
 * jQuery-Geo jQuery plugin v0.0.1
 *
 * Copyright 2010 by Dan Singerman <dansingerman@gmail.com>
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program; if not, write to the Free Software Foundation, Inc., 51
 * Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */
 
  (function($){

   var publicMethods = {
     locate :function( successCallback, failureCallback ) {
          if(navigator.geolocation) {
            // browser supports W3C geolocation API
            navigator.geolocation.getCurrentPosition( 
              function(location){
                processLocation(location, successCallback);
              }, 
              function(err){
                processError(err, failureCallback); 
              });
          }
          else if(window.google && google.gears) {
            // this provides support for Android versions < 2.0
            var geo = google.gears.factory.create('beta.geolocation');
            geo.getCurrentPosition(
              function(location){
                processLocation(location, successCallback);
              }, 
              function(err){
                processError(err, failureCallback);
              }); 
          }
          else {
            processError({code: 99}, failureCallback);
          }
     }
   };

  // success!! we have a latitude and longitude
  var processLocation = function (location, callback) {
    callback( location.coords.latitude,  location.coords.longitude );
  }

  /* we have failed to get a location
   * error has made up status code of 99 if device does not support W3C geolocation 
   * otherwise error is instance of PositionError
   * http://dev.w3.org/geo/api/spec-source.html#position_error_interface */
   
  var processError = function (error, callback) {
    var message;
    
    switch(error.code) {
      case error.TIMEOUT:
        message = "Geolocation Timeout"
        break;
      case error.PERMISSION_DENIED:
        message = "Permission Denied"
        break;
      case error.POSITION_UNAVAILABLE:
        message = "Position Unavailable"
        break;
      default:
        message = "Geolocation not supported by jQuery-Geo";
    };

    callback(error, message); 
  }   

  // best proactice jQuery plugin namespacing
  $.geo = function( method ) {

    if ( publicMethods[method] ) {
     return publicMethods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
     return publicMethods.init.apply( this, arguments );
    } else {
     $.error( 'Method ' +  method + ' does not exist on jQuery-Geo for this device' );
    }    

  };
})(jQuery);