const APIkey = "AIzaSyD70EcFlRlgIbc1ARNvns5CszqjaUyQzVI"
const repAPI = "https://www.googleapis.com/civicinfo/v2/representatives?key="
$(document).ready(function () {
    $(document).on('click', ".submit", function (event) {
        $(".candidates").empty()
        $(".official-name").empty()
        $(".official-address").empty()
        let Address = $(".address").val().trim();
        /*let AddressClean = Address.replace(/\s/g, '')*/
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



        const searchRep = address => {
            $.get("https://www.googleapis.com/civicinfo/v2/representatives?key=" + APIkey + "&address=" + AddressPOST/*+"&levels="+govt_level*/).then(response => {
                console.log(response.officials)
                for (let i = 0; i < response.officials.length; i++) {
                    var photo = "assets/images/blank-person.jpg"
                    var name = "not listed"
                    var party = "not listed"
                    var address = {}
                    var phones = "not listed"
                    var urls = "not listed"
                    if (response.officials[i].photoUrl) { photo = response.officials[i].photoUrl }
                    if (response.officials[i].name) { name = response.officials[i].name }
                    if (response.officials[i].party) { party = response.officials[i].party }
                    if (response.officials[i].address) { address = response.officials[i].address[0] }
                    else { address.line1 = "not listed"; address.line2 = "not listed"; address.city = "not listed"; address.state = "not listed"; address.zip = "not listed" }
                    if (response.officials[i].phones) { phones = response.officials[i].phones[0] }
                    if (response.officials[i].urls) { urls = response.officials[i].urls }
                    arrOfficials.push(response.officials[i].name)
                    console.log(response.officials[i])
                    $(".candidates").append(`<tr><td>
            <img height="100" width="100" src='${photo}' " /></td>
            <td class="${[i]}">${name}</td>
            <td class="official-party">${party}</td>
            <td class="official-address">${address.line1}<br>${address.line2}<br>${address.city}<br>${address.state}<br>${address.zip}<br></td>
                        <td class="official-phone">${phones}</td>
                        <td class="official-url">${urls}</td>
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
                    console.log(arrOfObjects)
                }
                arrOfficials.forEach((official, idx) => {
                    arrOfObjects.forEach(office => {
                        if (office.index.includes(idx)) {
                            $("." + idx).prepend(
                                office.office + " " + '</td></tr>')
                        }

                    })
                })





            })
        }

        searchRep()
    })
})
