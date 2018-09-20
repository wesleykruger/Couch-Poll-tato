const APIkey= "AIzaSyD70EcFlRlgIbc1ARNvns5CszqjaUyQzVI"
var Address=$('#address').val()
$.address.parameter('address', encodeURIComponent(address));
$("#address-image").html("<img class='img-responsive img-thumbnail' src='https://maps.googleapis.com/maps/api/staticmap?size=600x200&maptype=roadmap&markers=" + encodeURIComponent(address) + "' alt='" + address + "' title='" + address + "' />");

const searchRep = gif => {
    $.get("https://www.googleapis.com/civicinfo/v2/representatives?key="+APIkey+"&address="+Address).then(response => {
        for (let i = 0; i < response.departures.all.length; i++) {

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
}
searchTrain()
