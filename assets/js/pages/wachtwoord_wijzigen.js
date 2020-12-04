$( document ).ready(function() {
    $(function () {
        $("#wachtwoordknop").on("click", function () {

            let wachtwoord;
            let nieuwWachtwoord = document.getElementById("nieuw_wachtwoord").value;
            let bevestigWachtwoord = document.getElementById("bevestig_wachtwoord").value

            if(nieuwWachtwoord !== "" && bevestigWachtwoord !== "") {
                if (nieuwWachtwoord === bevestigWachtwoord) {
                    wachtwoord = nieuwWachtwoord;
                } else {
                    alert("Wachtwoord is niet hetzelfde.")
                }
                FYSCloud.API.queryDatabase(
                    "UPDATE profiel SET wachtwoord = ? WHERE id = ?", [wachtwoord, FYSCloud.Session.get("userid")]
                ).done(function (data) {
                    insertId = data["insertId"];
                    console.log(data);
                    alert("Gegevens zijn opgeslagen!")
                }).fail(function (data) {
                    console.log(data);
                });
            } else {
                alert("Velden mogen niet leeg zijn!")
            }
        });
    });
});