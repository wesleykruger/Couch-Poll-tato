const APIkey = "AIzaSyD70EcFlRlgIbc1ARNvns5CszqjaUyQzVI"

$(document).ready(function () {
    $(document).on('click', ".submit", function (event) {
        let Address = $(".address").val().trim();
        let AddressClean = Address.replace(/\s/g, '')
        let City = $(".city").val().trim();
        let State = $(".state").val().trim();
        let Country = $(".country").val().trim();
        let AddressLookup = AddressClean
        console.log(AddressLookup)
        /*$.address.parameter('address', encodeURIComponent(address));*/
        /*$(".address-image").html("<img class='img-responsive img-thumbnail' src='https://maps.googleapis.com/maps/api/staticmap?size=600x200&maptype=roadmap&markers=" + encodeURIComponent(address) + "' alt='" + address + "' title='" + address + "' />");*/

        const searchRep = address => {
            $.get("https://www.googleapis.com/civicinfo/v2/representatives?key=" + APIkey + "&address=" + AddressLookup).then(response => {
            for ( let i=1; i<response.officials.length;i++)
            console.log(`${response.offices[i].name}`+" "+`${response.officials[i].name}`)
        /*for (let i = 0; i < response.departures.all.length; i++) {

            let destinationName = `${response.departures.all[i].destination_name}`;
            let trainName = `${response.departures.all[i].operator_name}`;
            let platform = `${response.departures.all[i].platform}`;
            let departureTime = `${response.departures.all[i].aimed_departure_time}`;
           
             $(".destination").append(


                '<br><br>' + destinationName

            )
            $(".train-name").append(
                '<br><br>' + trainName
            )
            $(".platform").append(
                '<br><br>' + platform
            )
            $(".departure").append(
                
                '<br><br>' + departureTime
            )
        }

    })
}*/})
        }
        /*searchTrain()*/
        searchRep()
    })
})
