$(document).ready(function () {
    $("#registreren").on("click", function () {
        // Slaat de door de gebruiker ingevoerde waarde voor 'VOORNAAM' op in de onderstaande variabele
        let firstName = document.getElementById("firstName").value;


        let insertId = 0

        // Slaat de door de gebruiker ingevoerde waarde voor 'ACHTERNAAM' op in de onderstaande variabele
        let lastName = document.getElementById("lastName").value;

        // Slaat de door de gebruiker ingevoerde waarde voor 'GENDER' op in de onderstaande variabele
        let gender = document.getElementById("gender").value;

        // Slaat de door de gebruiker ingevoerde waarde voor 'WOONPLAATS' op in de onderstaande variabele
        let woonplaats = document.getElementById("woonplaats").value;

        // Slaat de door de gebruiker ingevoerde waarde voor 'REISBUDGET' op in de onderstaande variabele
        let budget = document.getElementById("budget").value;

        // Slaat de door de gebruiker ingevoerde waarde voor 'REISBESTEMMING' op in de onderstaande variabele
        let reisbestemming = document.getElementById("reisbestemming").value;

        // Slaat de door de gebruiker ingevoerde waarde voor 'E-MAIL' op in de onderstaande variabele
        let gebruikersnaam = document.getElementById("email").value;

        // Slaat de door de gebruiker ingevoerde waarde voor 'WACHTWOORD' op in de onderstaande variabele
        let wachtwoord = document.getElementById("user-password").value;


        // let geboortedatum = $("#geboortedatum").date({ dateFormat: 'dd,MM,yyyy' }).value;

        // Slaat de door de gebruiker ingevoerde waarde voor 'BIOGRAFIE' op in de onderstaande variabele
        let bio = document.getElementById("bio").value;

        // Slaat de door de gebruiker ingevoerde waarde voor 'HOBBY'S' op in de onderstaande variabele
        let selectElementHobby = document.getElementById("multiple-checkboxes")
        let selectedValuesHobby = Array.from(selectElementHobby.selectedOptions)
            .map(option => option.value)
        // Maakt een nieuwe array aan met als inhoud het resultaat van het aanroepen van de meegegeven functie op elk van de elementen uit de originele array
        // you could also do: selectElement.options

        FYSCloud.API.queryDatabase(
            "INSERT INTO xxx()" + "value"
        )

        FYSCloud.API.queryDatabase(
            "INSERT INTO profiel(voornaam,achternaam,gender,woonplaats,budget,reisbestemming,gebruikersnaam,wachtwoord,bio)" +
            "values(?,?,?,?,?,?,?,?,?)",
            [firstName, lastName, gender, woonplaats, budget, reisbestemming, gebruikersnaam,wachtwoord, bio]
        ).done(function (data) {
            insertId = data["insertId"];
            FYSCloud.Utils
                .getDataUrl($("#profielfoto"))
                .done(function (data) {
                    console.log(data["extension"]);
                    FYSCloud.API.uploadFile(
                        insertId + 'profielfoto.' + data["extension"],
                        data.url,
                        true
                    ).done(function (data) {
                        console.log(data);
                        FYSCloud.API.queryDatabase(
                            "UPDATE profiel SET profielfoto = ? where id = ?", [data, insertId]
                        ).done(function (data) {
                            let insertId = data["insertId"];
                        }).fail(function (data) {
                            console.log(data);
                        });
                    }).fail(function (reason) {
                        console.log("Het uploaden van je foto is mislukt!");
                    });
                }).fail(function (reason) {
                console.log(reason);
            });
        }).fail(function (data) {
            console.log(data);
        });
    });
});