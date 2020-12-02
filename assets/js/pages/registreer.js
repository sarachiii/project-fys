$(document).ready(function () {
    $('#multiple-checkboxes').multiselect({
        includeSelectAllOption: true,
    });
    $("#registreren").on("click", function () {
        let firstName = document.getElementById("firstName").value;
        let insertId = 0
        let lastName = document.getElementById("lastName").value;
        let gender = document.getElementById("gender").value;
        let woonplaats = document.getElementById("woonplaats").value;
        let budget = document.getElementById("budget").value;
        let reisbestemming = document.getElementById("reisbestemming").value;
        let gebruikersnaam = document.getElementById("email").value;
        let wachtwoord = document.getElementById("user-password").value;
        let geboortedatum = $("#geboortedatum").date({ dateFormat: 'dd,MM,yyyy' }).value;
        let bio = document.getElementById("bio").value;
        FYSCloud.API.queryDatabase(
            "INSERT INTO profiel(voornaam,achternaam,gender,geboortedatum,woonplaats,budget,reisbestemming,gebruikersnaam,wachtwoord,bio)" +
            "values(?,?,?,?,?,?,?,?,?)",
            [firstName, lastName, gender, geboortedatum, woonplaats, budget, reisbestemming, gebruikersnaam,wachtwoord, bio]
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