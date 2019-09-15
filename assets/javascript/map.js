$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBWQ-sFtacE3m0IMYrFlP7w_dgNQpL-bBw&libraries=places,geometry', function(){
    // Initializes map upon loading of Google Maps API (see script callback in index.html)
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 13
    })
    const service = new google.maps.places.PlacesService(map);
    const infowindow = new google.maps.InfoWindow(); 
    let latLng;
    // Calls W3C geolocation feature of user's browser
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let userLat = position.coords.latitude;
            let userLng = position.coords.longitude;
            // Casts user coordinates as a Google Maps LatLng object
            latLng = new google.maps.LatLng(userLat, userLng);
            // Centers the Map on user
            map.setCenter(latLng);
            // Initializing request query for dog "places" in your area
            let request = {
                location: latLng,
                radius: '200',
                query: 'dog'
            }
            service.textSearch(request, function(results, status){
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    results.forEach(result => {
                        createMarker(result);
                    })
                }
            });
        })
    }

    // Map marker factory with CorgiAfraidofSun.jpeg as placeholder icon
    function createMarker(place){
        let icon = {
            url: 'Images/CorgiAfraidofSun.jpeg',
            scaledSize: new google.maps.Size(50, 50),
        }
        let marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: icon
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }
})