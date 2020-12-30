$( document ).ready(function() {

    /* Profiel gegevens van de database halen */
    FYSCloud.API.queryDatabase(
        "SELECT * FROM profiel WHERE id = ?", [FYSCloud.Session.get("userid")]
    ).done(function (data) {

        document.getElementById("profielplaatje").src = data[0].profielfoto;
        $("#voornaam").append(data[0]["voornaam"]);
        $("#achternaam").append(data[0]["achternaam"]);
        // Zet de geboortedatum om in de juiste format: DD/MM/YYYY
        let date = new Date(data[0]["geboortedatum"]).toLocaleDateString('en-GB');
        $("#geboortedatum").append(date);
        // Berekent huidige leeftijd
        let age = new Date().getFullYear() - new Date(data[0]["geboortedatum"]).getFullYear();
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

    FYSCloud.API.queryDatabase(
        "SELECT hobby FROM interesse INNER JOIN profiel_has_interesse ON profiel_has_interesse.Interesse_id = interesse.id WHERE Profiel_id = ?", [FYSCloud.Session.get("userid")]
    ).done(function (data) {
        for (let i = 0; i < data.length; i++) {
            $("#hobby").append(data[i]["hobby"] + "\n");
        }
    }).fail(function (data) {
        console.log(data);
    });
});
