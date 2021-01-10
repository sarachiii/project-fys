/* Deze functie checkt of de ingevoerde gegevens van de inputvelden juist zijn en geeft het veld een rode of groene kleur, en eventueel een foutmelding
*  De functie wordt aangeroepen door het onblur event, dus op het moment dat je van het huidige invoerveld af gaat.
*/
function check() {

    let gebruikersnaamVeld = document.getElementById("inputEmail");
    let gebruikersnaamValue = gebruikersnaamVeld.value;
    let wachtwoordVeld = document.getElementById("inputPassword");
    let wachtwoordValue = wachtwoordVeld.value;

    /* checkt of de gebruikersnaam in de database voorkomt, maar alleen als er iets in het veld is ingevuld */
    if (gebruikersnaamValue !== "") {
        FYSCloud.API.queryDatabase(
            "SELECT email FROM profiel WHERE email = BINARY ?", [gebruikersnaamValue] //BINARY zorgt ervoor dat de zoekterm case sensitive is
        ).done(function (data) {
            if (data.length > 0) {
                gebruikersnaamVeld.classList.add("inputGood");
                document.getElementById("errorveld3").classList.add("verborgen");
            } else {
                gebruikersnaamVeld.classList.add("inputError");
                document.getElementById("errorveld3").classList.remove("verborgen");
            }
        }).fail(function (data) {
            console.log(data);
        });
    }

    /* checkt of zowel de gebruikersnaam als het wachtwoord overeenkomen, maar alleen als beide velden zijn ingevuld */
    if (gebruikersnaamValue !== "" && wachtwoordValue !== "") {
        FYSCloud.API.queryDatabase(
            "SELECT email, wachtwoord FROM profiel WHERE email = BINARY ? AND wachtwoord = BINARY ? ", [gebruikersnaamValue, wachtwoordValue]
        ).done(function (data) {
            if (data.length > 0) {
                gebruikersnaamVeld.classList.add("inputGood");
                wachtwoordVeld.classList.add("inputGood");
                document.getElementById("errorveld3").classList.add("verborgen");
                document.getElementById("errorveld4").classList.add("verborgen");
                document.getElementById("errorveld5").classList.add("verborgen");
            }
        }).fail(function (data) {
            console.log(data);
        });
    }
}

/* Deze functie wordt aangeroepen als je op de log in knop klikt en controleert of gebruikersnaam en wachtwoord goed zijn,
*  bij correcte invoer kom je op de ingelogde omgeving, bij foutieve invoer krijg je een foutmelding.
*/

document.addEventListener('DOMContentLoaded', function (event) {

    loginButton.onclick = function () {

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
            "SELECT * FROM profiel WHERE email = BINARY ? AND wachtwoord = BINARY ? ", [gebruikersnaam, wachtwoord]
        ).done(function (data) {
            if (data.length > 0) {
                FYSCloud.Session.set("userid", data[0]["id"]);
                FYSCloud.URL.redirect("match.html");
            } else {
                if (gebruikersnaam == "" && wachtwoord == "") {
                    gebruikersnaamveld.classList.add("inputError");
                    wachtwoordveld.classList.add("inputError");
                    document.getElementById("errorveld5").classList.remove("verborgen");
                } else if (wachtwoord == "") {
                    wachtwoordveld.classList.add("inputError");
                    document.getElementById("errorveld5").classList.remove("verborgen");
                } else if (gebruikersnaam == "") {
                    gebruikersnaamveld.classList.add("inputError");
                    document.getElementById("errorveld5").classList.remove("verborgen");
                } else {
                    FYSCloud.API.queryDatabase(
                        "SELECT * FROM profiel WHERE email = BINARY ?", [gebruikersnaam]
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
