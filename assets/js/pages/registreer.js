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

        // Slaat de door de gebruiker ingevoerde waarde voor 'GEBOORTEDATUM' op in de onderstaande variabele
        let geboortedatum = document.getElementById("geboortedatum").value;

        // Slaat de door de gebruiker ingevoerde waarde voor 'BIOGRAFIE' op in de onderstaande variabele
        let bio = document.getElementById("bio").value;

        var date = new Date($('#geboortedatum').val());
        day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();
        alert([day, month, year].join('/'));


        FYSCloud.API.queryDatabase(
            "INSERT INTO profiel(voornaam,achternaam,gender,woonplaats,budget,reisbestemming,gebruikersnaam,wachtwoord,bio,geboortedatum)" +
            "values(?,?,?,?,?,?,?,?,?,?)",
            [firstName, lastName, gender, woonplaats, budget, reisbestemming, gebruikersnaam,wachtwoord, bio, geboortedatum]
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
                            alert("Het aanmaken van je profiel is gelukt!")
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