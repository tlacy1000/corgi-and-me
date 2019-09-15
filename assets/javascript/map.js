$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBWQ-sFtacE3m0IMYrFlP7w_dgNQpL-bBw', function(){
    // Initializes map upon loading of Google Maps API (see script callback in index.html)
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 13
    }) 
    let userLat = 0;
    let userLng = 0;
    let latLng;
    // Calls W3C geolocation feature of user's browser
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            userLat = position.coords.latitude;
            userLng = position.coords.longitude;
            // Casts user coordinates as a Google Maps LatLng object
            latLng = new google.maps.LatLng(userLat, userLng);
            // Centers the Map on user
            map.setCenter(latLng);
        })
    }
})