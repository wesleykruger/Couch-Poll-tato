const APIkey = "AIzaSyD70EcFlRlgIbc1ARNvns5CszqjaUyQzVI"
const repAPI="https://www.googleapis.com/civicinfo/v2/representatives?key="
$(document).ready(function () {
    $(document).on('click', ".submit", function (event) {
        let Address = $(".address").val().trim();
        /*let AddressClean = Address.replace(/\s/g, '')*/
        let City = $(".city").val().trim();
        let State = $(".state").val().trim();
        let Country = $(".country").val().trim();
        let AddressLookup = Address+City+State+Country
        let AddressPOST=encodeURIComponent(AddressLookup)
        console.log(AddressPOST)
        var govt_level=[]
        if($(".local").is(':checked')){
            govt_level.push('local')
        }
        if($(".county").is(':checked')){
            govt_level.push('county')
        }
        if($(".state").is(':checked')){
            govt_level.push('state')
        }
        if($(".federal").is(':checked')){
            govt_level.push('federal')
        }
        //Working on the address parameters below
        /*$.address.parameter('results_level', results_level_set);
        $.address.parameter('address', AddressPOST);
        var params = {
            'key': APIkey,
            'address': addressPOST
        }
        $.when($.getJSON(repAPI, params)).then(function(data){
            console.log(params)
        }) */

        /*$.address.parameter('address', encodeURIComponent(address));*/
        /*$(".address-image").html("<img class='img-responsive img-thumbnail' src='https://maps.googleapis.com/maps/api/staticmap?size=600x200&maptype=roadmap&markers=" + encodeURIComponent(address) + "' alt='" + address + "' title='" + address + "' />");*/

        const searchRep = address => {
            $.get("https://www.googleapis.com/civicinfo/v2/representatives?key=" + APIkey + "&address=" + AddressPOST).then(response => {
            for ( let i=0; i<response.officials.length;i++){
            console.log(`${response.offices[i].name}`+" "+`${response.officials[i].name}`)
            $(".candidates").append(`<tr><td>
            <img height="100" width="100" src='${response.officials[i].photoUrl}' onerror="this.src='images/blank-person.jpg'" /></td>
            <td>${response.offices[i].name}`+" "+`${response.officials[i].name}</td>
        `)
           console.log(`${response.officials[i].party}`)
            }
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
