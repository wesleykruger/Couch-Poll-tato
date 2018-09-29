const APIkey = "AIzaSyD70EcFlRlgIbc1ARNvns5CszqjaUyQzVI"
const repAPI = "https://www.googleapis.com/civicinfo/v2/representatives?key="
const twitterURL = "https://twitter.com/"
const facebookURL = "https://www.facebook.com/"
const twitterImage = "assets/images/twitterlogo.png"
const facebookImage = "assets/images/facebooklogo.png"
$(document).ready(function () {
    $(".rep-table").hide()
    $(document).on('click', ".submit", function (event) {
        $(".rep-table").show()
        $(".representatives").empty()
        $(".official-name").empty()
        $(".official-address").empty()
        $(".official-phone").empty()
        $(".official-url").empty()
        let Address = $(".address").val().trim();
        let City = $(".city").val().trim();
        let State = $(".state").val().trim();
        let Country = $(".country").val().trim();
        let AddressLookup = Address + City + State + Country
        let AddressPOST = encodeURIComponent(AddressLookup)

        var govt_level = []
        if ($(".local").is(':checked')) {
            govt_level.push('undefined')
        }
        if ($(".county").is(':checked')) {
            govt_level.push('undefined')
        }
        if ($(".state").is(':checked')) {
            govt_level.push('administrativeArea1')
        }
        if ($(".federal").is(':checked')) {
            govt_level.push('country')
        }
        var govt_level = []
        var addresses = []
        var arrOfObjects = []
        var arrOfficials = []
        var socialMedia = []


        const searchRep = address => {
            $.get("https://www.googleapis.com/civicinfo/v2/representatives?key=" + APIkey + "&address=" + AddressPOST).then(response => {
                for (let i = 0; i < response.officials.length; i++) {
                    var photo = "assets/images/blank-person.jpg"
                    var name = "Not Listed"
                    var party = "Not Listed"
                    var address = {}
                    var phones = "Not Listed"
                    var urls = "Not listed"
                    var twitter = ""
                    var facebook = ""
                    if (response.officials[i].photoUrl) { photo = response.officials[i].photoUrl }
                    if (response.officials[i].name) { name = response.officials[i].name }
                    if (response.officials[i].party) { party = response.officials[i].party }
                    if (response.officials[i].address) { address = response.officials[i].address[0] }
                    else { address.line1 = "Not Listed"; address.line2 = "Not Listed"; address.city = "Not Listed"; address.state = "Not Listed"; address.zip = "Not Listed" }
                    if (!(address.line2)) { address.line2 = "" }
                    else { address.line2 = address.line2 + `<br>` }
                    if (response.officials[i].phones) { phones = response.officials[i].phones[0] }
                    if (response.officials[i].urls) { urls = response.officials[i].urls }
                    if (response.officials[i].channels) { twitter = twitterURL + response.officials[i].channels[0].id }
                    else { twitter = "Twitter Not Listed" }
                    if (response.officials[i].channels && response.officials[i].channels.length > 1) { facebook = facebookURL + response.officials[i].channels[1].id }
                    else { facebook = "Facebook Not Listed" }
                    arrOfficials.push(response.officials[i].name)
                    $(".representatives").append(`<tr><td>
            <img height="100" width="100" src='${photo}' " /></td>
            <td class="official-name">${name}</td>
            <td class="${[i]}"></td>
            <td class="official-party">${party}</td>
            <td class="official-address">${address.line1}<br>${address.line2}${address.city}<br>${address.state}<br>${address.zip}<br></td>
                        <td class="official-phone">${phones}</td>
                        <td class="official-url"><a href=${urls}target="_blank">Website</a></td>
                        <td class="official-twitter"><a href=${twitter}>
                        <img alt="Twitter_Icon" src="assets/images/twitterlogo.png" width="50" height="50"></a>
                         </td>
                         <td class="official-facebook"><a href=${facebook}>
                         <img alt="Facebook_Icon" src="assets/images/facebooklogo.png" width="50" height="50"></a>
                         </td>
                         
        `)
                }


                for (let i = 0; i < response.offices.length; i++) {
                    arrOfObjects.push(

                        {
                            office: response.offices[i].name,
                            index: response.offices[i].officialIndices,
                            level: response.offices[i].levels
                        }
                    )
                }
                arrOfficials.forEach((official, idx) => {
                    arrOfObjects.forEach(office => {
                        if (office.index.includes(idx)) {
                            $("." + idx).append(
                                office.office)
                        }

                    })
                })






            })
        }

        searchRep()
    })
})
