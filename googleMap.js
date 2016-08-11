var mapApp=angular.module('mapApp',['ngMaterial']);
mapApp.controller('mapController',function($scope,$http){


$scope.filteredCities='';


  $scope.title1 = 'Button';
  $scope.title4 = 'Warn';
  $scope.isDisabled = true;
  $scope.googleUrl = 'http://google.com';

 

var myLatlng = {lat: 33.363, lng: -84.044};
       var map = new google.maps.Map(document.getElementById('map'), {
         zoom: 4,
         center: myLatlng
       });
       

       var markers=[];




       function createMarker(city){
       	// console.log(city);
       	
       

        var icon="http:chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7CFE7569 ";
         if (city.yearRank==39){
             icon="Images/atl.png"
            } 
        var cityLatlng={lat:city.lat, lng:city.lon};
       	 var marker = new google.maps.Marker(
       	 {
          position:cityLatlng,
          map: map,
          title: city.city,
          icon: icon


        });

var infoString=city.city+" Pop:"+city.lastCensus;
	var infoWindow=new google.maps.InfoWindow({
		content:infoString
    
    
	})

	google.maps.event.addListener(marker,'click',function(){
		infoWindow.open(map,marker);
	});
	 markers.push(marker);
       } //END CREATEMARKER


       //BEGIN RESET MAP
       $scope.resetMap=function(){
        $scope.updateMarkers;
        
       };


       $scope.triggerClick=function(index){
       		google.maps.event.trigger(markers[index],"click")
       	
       }

      
	$scope.cities=cities;
	for(var i=0; i<$scope.cities.length; i++){
		createMarker($scope.cities[i]);
	}

//UPDATE MARKERS
$scope.updateMarkers=function(){
    for(var i=0;i<markers.length;i++){
      markers[i].setMap(null);
    }
    for(var i=0; i<$scope.filteredCities.length; i++){
      createMarker($scope.filteredCities[i]);
    
  }
}

//GET DIRECTIONS FUNCTION
$scope.getDirections=function(lat,lon){
  var changeDestination=new google.maps.LatLng(lat,lon);

console.log(changeDestination) 

   var directionsService = new google.maps.DirectionsService;
   var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('list-window'));
 directionsService.route({
          origin: 'Atlanta, GA',
          destination: changeDestination,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }

        });
}

$scope.zoomToCity=function(lat,lon,location){

    var cityLatLon= new google.maps.LatLng(lat,lon);
     var bounds=new google.maps.LatLngBounds();
    map=new google.maps.Map(document.getElementById('map'),
    {
          zoom: 10,
         center: cityLatLon
    }); //);
    infowindow=new google.maps.InfoWindow();
    var service=new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: cityLatLon,
      radius:500,
      type:location
    },callback);


      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createPointOfInterest(results[i]);
          }
        }
      }

      function createPointOfInterest(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
          // icon:
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
        bounds.extend(marker.getPosition());

 } //end createPointOfInterest

  // map.fitBounds(bounds);

 }


});