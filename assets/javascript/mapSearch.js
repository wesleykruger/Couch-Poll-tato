$(document).ready(function () {



    
    $(".searchMap").on("click", function () {
        console.log("click");
        let streetAddress = $(".streetAddress");
        let cityAddress = $(".cityAddress");
        let stateAddress = $(".stateAddress");
        let zipAddress = $(".zipAddress");
        let countryAddress = $(".countryAddress");



        var addressesArray = [
            '301 Brazos St, 78701',
            //follow this structure
        ];
        //loop all the addresses and call a marker for each one
        for (var x = 0; x < addressesArray.length; x++) {
            $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + addressesArray[x] + '&sensor=false', null, function (data) {
                var p = data.results[0].geometry.location;
                var latlng = new google.maps.LatLng(p.lat, p.lng);
                var aMarker = new google.maps.Marker({
                    position: latlng, //it will place marker based on the addresses, which they will be translated as geolocations. 
                    map: map

                });

            });
        }
    });
});

