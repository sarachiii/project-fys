/* Controleert of gebruikersnaam en wachtwoord goed zijn,
*  bij correcte invoer kom je op de ingelogde omgeving en krijg je een melding dat het gelukt is,
*  bij foutieve invoer krijg je een foutmelding.
*/

document.addEventListener('DOMContentLoaded', function (event){

    loginButton.onclick = function () {
        let gebruikersnaam = document.getElementById("inputEmail").value;
        let wachtwoord = document.getElementById("inputPassword").value;

        FYSCloud.API.queryDatabase(
            "SELECT * FROM login WHERE gebruikersnaam = ? AND wachtwoord = ?", [gebruikersnaam, wachtwoord]
        ).done(function(data) {

            if(data.length > 0) {
                alert("GELUKT! U bent nu ingelogd.")
                window.location.href = 'match.html';
            } else {
                alert("Email of wachtwoord is fout!")
            }
            console.log(data);
        }).fail(function(reason) {
            console.log("Er is iets fout gegaan!");
        });
    }
});
