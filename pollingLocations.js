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
            <td class="vote-site-name">${response.earlyVoteSites[i].pollingHours}
            
        `)
           
           console.log(`${response.earlyVoteSites[i].pollingHours}`)
        }  
            
           
        
        })
        }
        
        searchPoll()
    })
})