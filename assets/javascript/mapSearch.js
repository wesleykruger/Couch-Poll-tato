$(document).ready(function () {
    $(".searchMap").on("click", function () {
        console.log("click");
        let streetAddress = $(".streetAddress");
        let cityAddress = $(".cityAddress");
        let stateAddress = $(".stateAddress");
        let zipAddress = $(".zipAddress");
        let countryAddress = $(".countryAddress");

        var locations = [];


        var testAddress = "2515 Catamount St, Bozeman, MT 59715";
        var locationsUrl = "https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyD70EcFlRlgIbc1ARNvns5CszqjaUyQzVI";
        var electionID = "&electionId=6000";
        let AddressLookup = testAddress
        let AddressPOST = encodeURIComponent(AddressLookup)
        console.log(AddressPOST)
        const searchPoll = address => {
            $.get(locationsUrl + electionID + "&address=" + AddressPOST/*+"&levels="+govt_level*/).then(response => {

                // Empty the div so we don't have append multiple if user clicks search >1 time
                if ($(".locationInfo").length != 0) {
                    $(".locationInfo").empty();
                }

                if ($(".pollingTimeTable").length != 0) {
                    $(".pollingTimeTable").empty();
                }

                //$(".pollingTimeTable").append(`<table><tr><td>"Day of Week"</td></tr></table>`)

                for (let i = 0; i < response.earlyVoteSites.length; i++) {
                    locations.push(response.earlyVoteSites[i].address.line1 + ", " + response.earlyVoteSites[i].address.line2 + ", " + response.earlyVoteSites[i].address.city + ", " + response.earlyVoteSites[i].address.state + ", " + response.earlyVoteSites[i].address.zip);
                    let splitPollingHours = response.earlyVoteSites[i].pollingHours.split(/\n/g)||[];

                    splitPollingHours.forEach(day => {

                    })

                    console.log("split: " + splitPollingHours[3]);
                    $(".locationInfo").append(`<tr>
                     <td class="vote-site-name">${response.earlyVoteSites[i].address.locationName}<br>${response.earlyVoteSites[i].address.line1}, ${response.earlyVoteSites[i].address.city}, ${response.earlyVoteSites[i].address.state} ${response.earlyVoteSites[i].address.zip}
                     <br>Start Date: ${response.earlyVoteSites[i].startDate}<br>End Date: ${response.earlyVoteSites[i].endDate}
                     <br>${response.earlyVoteSites[i].pollingHours}<br>Polling Location Notes: ${response.earlyVoteSites[i].notes}
                     <br>Is this polling location officially verified for election? : <b>${response.earlyVoteSites[i].sources[0].official}</b></td>`
                    )
                    console.log(response.earlyVoteSites[i]);

                }

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
                                //infowindow.setContent(address);
                                infowindow.setContent()
                                infowindow.open(map, marker);
                            }
                        })(marker, address));


                        //now fit the map to the newly inclusive bounds
                        map.fitBounds(bounds);

                    });

                });



            })
        }

        //create empty LatLngBounds object
        var bounds = new google.maps.LatLngBounds();
        var infowindow = new google.maps.InfoWindow();

        searchPoll();
    });

    function urlAddress(address) {
        return address.replace(/\s+/g, '+');
    }
});