var DOB = ""

$(document).ready(function () {
    $(document).on('blur', ".dob", function (event) {
        $(".age").empty()
        DOB = $(".dob").val().trim();
        age = moment(DOB, "YYYYMMDD").fromNow()
        yearsOld=age.replace("ago", "old")
        $(".age").append("Age: "+yearsOld)
        let string = yearsOld;
        let numbers = string.match(/\d+/g).map(Number);
        console.log(numbers[0])
        if(parseInt(numbers[0])<18){
        $(".age").append("<br> <div class=underage><b>You have to be 18 years old to vote. We still have informative resources for you if you sign up!<b></div>")
        $(".underage").css("color", "red");
    }
    })
})