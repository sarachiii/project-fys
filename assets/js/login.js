/* Controleert of gebruikersnaam en wachtwoord goed zijn,
*  bij correcte invoer kom je op de ingelogde omgeving en krijg je een melding dat het gelukt is,
*  bij foutieve invoer krijg je een foutmelding.
*/

document.addEventListener('DOMContentLoaded', function (event){

    loginButton.onclick = function () {
        let userid = FYSCloud.Session.get("userid");
        let gebruikersnaam = document.getElementById("inputEmail").value;
        let wachtwoord = document.getElementById("inputPassword").value;

        FYSCloud.API.queryDatabase(
            "SELECT * FROM profiel WHERE email = ? AND wachtwoord = ?", [gebruikersnaam, wachtwoord]
        ).done(function(data) {
            if(data.length > 0) {
                FYSCloud.API.queryDatabase(
                    "SELECT voornaam FROM profiel WHERE id = ?", [userid]
                ).done(function(data) {
                }).fail(function(reason) {
                    console.log(reason);
                });
                alert("Welkom terug " + data[0].voornaam + " !");
                FYSCloud.Session.set("userid", data[0]["id"]);
                window.location.href = 'match.html';
            } else {
                alert("Email of wachtwoord is fout!")
            }
            console.log(data);
        }).fail(function(reason) {
            console.log(reason);
        });
    }
});
