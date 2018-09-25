$(document).ready(function () {
    $(".searchMap").on("click", function () {
        console.log("click");
        let streetAddress = $(".streetAddress");
        let cityAddress = $(".cityAddress");
        let stateAddress = $(".stateAddress");
        let zipAddress = $(".zipAddress");
        let countryAddress = $(".countryAddress");

        var locations = [
            '301 Brazos St, Austin, TX 78701',
            '301 Congress Ave, Austin, TX 78701'
            //follow this structure
        ];


        //create empty LatLngBounds object
        var bounds = new google.maps.LatLngBounds();
        var infowindow = new google.maps.InfoWindow();


        locations.forEach(address => {

            let parsedAddress = urlAddress(address);
            let llUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + parsedAddress + "&key=AIzaSyCYQHKMzQBNqWcLUvLKJNrSdXqZ90wOA88";
            $.getJSON(llUrl).then(function (data) {
                let longLat = {
                    longitude: data.results[0].geometry.location.lng,
                    latitude: data.results[0].geometry.location.lat
                };

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(longLat.latitude, longLat.longitude),
                    map: map
                });

                //extend the bounds to include each marker's position
                bounds.extend(marker.position);

                google.maps.event.addListener(marker, 'click', (function (marker, address) {
                    return function () {
                        infowindow.setContent(address);
                        infowindow.open(map, marker);
                    }
                })(marker, address));


                //now fit the map to the newly inclusive bounds
                map.fitBounds(bounds);

            });

        });
    });

    function urlAddress(address) {
        return address.replace(/\s+/g, '+');
    }
});