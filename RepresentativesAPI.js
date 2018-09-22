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
        var addresses=[]
        const searchRep = address => {
        $.get("https://www.googleapis.com/civicinfo/v2/representatives?key=" + APIkey + "&address=" + AddressPOST/*+"&levels="+govt_level*/).then(response => {
            
            for ( let i=0; i<response.officials.length;i++){
            $(".candidates").append(`<tr><td>
            <img height="100" width="100" src='${response.officials[i].photoUrl}' onerror="this.src='images/blank-person.jpg'" /></td>
            <td class="official-name">${response.officials[i].name}
            
        `)
           
           console.log(response.officials.indexOf(response.officials[i]))
           /*console.log(`${response.officials[i].address[i].line1}`)*/
           /*<br>${response.officials[i].address[i].line2}<br>${response.officials[i].address[i].city}<br>${response.officials[i].address[i].state}<br>${response.officials[i].address[i].zip}<br>*/
        }  
            
           for ( let i=0; i<response.offices.length;i++){
                if( `${response.offices[i].officialIndices}`.includes(`${response.officials.indexOf(response.officials[i])}`)){
                $(".official-name").prepend(`
                ${response.offices[i].name}</td></tr>
                `)}
                //console.log(`${response.offices[i].name}`)
                console.log(`${response.offices[i].officialIndices}`)
                console.log(`${response.officials.indexOf(response.officials[i])}`)
            }
        
        })
        }
        
        searchRep()
    })
})
