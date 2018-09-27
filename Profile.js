var DOB = ""

$(document).ready(function () {
    $(document).on('blur', ".dob", function (event) {
        DOB = $(".dob").val().trim();
        age = moment(DOB, "YYYYMMDD").fromNow()
        yearsOld=age.replace("ago", "old")
        $(".age").append(yearsOld)

    })
})