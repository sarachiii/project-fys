$( document ).ready(function() {

    /* Profiel gegevens van de database halen */
    FYSCloud.API.queryDatabase(
        "SELECT * FROM profiel WHERE id = ?", [FYSCloud.Session.get("userid")]
    ).done(function (data) {

        document.getElementById("profielplaatje").src = data[0].profielfoto;
        $("#voornaam").append(data[0]["voornaam"]);
        $("#achternaam").append(data[0]["achternaam"]);
        let date = new Date(data[0]["geboortedatum"]).toLocaleDateString('en-US');
        $("#geboortedatum").append(date);
        let birthdate = new Date(data[0]["geboortedatum"]);
        let cur = new Date();
        let diff = cur-birthdate; // This is the difference in milliseconds
        let age = Math.floor(diff/(1000*60*60*24*365.25)); // Divide by 1000*60*60*24*365.25
        $("#leeftijd").append(age);
        $("#geslacht").append(data[0]["gender"]);
        $("#woonplaats").append(data[0]["woonplaats"]);
        $("#email").append(data[0]["email"]);
        $("#reisbestemming").append(data[0]["reisbestemming"]);
        $("#budget").append(data[0]["budget"]);
        $("#bio").append(data[0]["bio"]);
    }).fail(function (data) {
        console.log(data);
    });

});
