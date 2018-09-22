var testAddress="2515 Catamount St, Bozeman, MT 59715"
var url="https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyD70EcFlRlgIbc1ARNvns5CszqjaUyQzVI"
var electionID="&electionId=6000"
APIkey="AIzaSyD70EcFlRlgIbc1ARNvns5CszqjaUyQzVI"
$(document).ready(function () {
    $(document).on('click', ".submit", function (event) {
        /*let Address = $(".address").val().trim();
        let AddressClean = Address.replace(/\s/g, '')*/
       /* let City = $(".city").val().trim();
        let State = $(".state").val().trim();
        let Country = $(".country").val().trim();*/
        let AddressLookup = testAddress
        let AddressPOST=encodeURIComponent(AddressLookup)
        console.log(AddressPOST)
        const searchPoll = address => {
        $.get(url+electionID+"&address=" + AddressPOST/*+"&levels="+govt_level*/).then(response => {
            
            for ( let i=0; i<response.earlyVoteSites.length;i++){
            $(".vote-site").append(`<tr><td>
            <td class="vote-site-name">${response.earlyVoteSites[i].address.locationName}<br>${response.earlyVoteSites[i].address.line1}<br>${response.earlyVoteSites[i].address.city}<br>${response.earlyVoteSites[i].address.state}<br>${response.earlyVoteSites[i].address.zip}<br>${response.earlyVoteSites[i].pollingHours}<br>Polling Location Notes: ${response.earlyVoteSites[i].notes}
            <br>Start Date: ${response.earlyVoteSites[i].startDate}<br>End Date: ${response.earlyVoteSites[i].endDate}<br>Is thie polling location officially verified for election? : <b>${response.earlyVoteSites[i].sources[0].official}</b>
            
        `)
           
           console.log(`${response.earlyVoteSites[i].pollingHours}`)
        }  
            
           
        
        })
        }
        
        searchPoll()
    })
})