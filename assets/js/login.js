/* Controleert of gebruikersnaam en wachtwoord goed zijn,
*  bij correcte invoer kom je op de ingelogde omgeving en krijg je een melding dat het gelukt is,
*  bij foutieve invoer krijg je een foutmelding.
*/

document.addEventListener('DOMContentLoaded', function (event) {

    loginButton.onclick = function () {

        let userid = FYSCloud.Session.get("userid");
        let gebruikersnaamveld = document.getElementById("inputEmail");
        let gebruikersnaam = gebruikersnaamveld.value;
        let wachtwoordveld = document.getElementById("inputPassword");
        let wachtwoord = wachtwoordveld.value;

        /* div met foutmelding weghalen */
        document.getElementById("errorveld3").classList.add("verborgen");
        document.getElementById("errorveld4").classList.add("verborgen");
        document.getElementById("errorveld5").classList.add("verborgen");
        wachtwoordveld.classList.remove("inputError");
        gebruikersnaamveld.classList.remove("inputError");

        FYSCloud.API.queryDatabase(
            "SELECT * FROM profiel WHERE BINARY email = ? AND wachtwoord = ? ", [gebruikersnaam, wachtwoord]
        ).done(function (data) {
            if (data.length > 0) {
                FYSCloud.Session.set("userid", data[0]["id"]);
                window.location.href = 'match.html';
            } else {
                if (gebruikersnaam == "" && wachtwoord == "") {
                    gebruikersnaamveld.classList.add("inputError");
                    wachtwoordveld.classList.add("inputError");
                    document.getElementById("errorveld5").classList.remove("verborgen");
                } else if (wachtwoord == "") {
                    wachtwoordveld.classList.add("inputError");
                    document.getElementById("errorveld5").classList.remove("verborgen");
                } else if (gebruikersnaam == ""){
                    gebruikersnaamveld.classList.add("inputError");
                    document.getElementById("errorveld5").classList.remove("verborgen");
                } else {
                    FYSCloud.API.queryDatabase(
                        "SELECT * FROM profiel WHERE BINARY email = ?", [email]
                    ).done(function (data) {
                        if (data.length > 0) {
                            wachtwoordveld.classList.add("inputError");
                            document.getElementById("errorveld4").classList.remove("verborgen");
                        } else {
                            gebruikersnaamveld.classList.add("inputError");
                            document.getElementById("errorveld3").classList.remove("verborgen");
                        }
                    }).fail(function (reason) {
                        console.log(reason);
                    });
                }
            }
        }).fail(function (reason) {
            console.log(reason);
        });
    }
});
