function check() {

    /* Patroon waar het wachtwoord aan voldoen moet */
    let regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    let ww1 = document.getElementById("nieuw_wachtwoord");
    let ww1_value = ww1.value;
    let ww2 = document.getElementById("bevestig_wachtwoord");
    let ww2_value = ww2.value;

    /* Bij niet overeenkomend wachtwoord wordt er een div met de foutmelding op het scherm getoond,
    en het invoer vakje krijgt een rode kleur */

    if(ww1_value != "") {
        if (regex.test(ww1_value)) {
            ww1.classList.remove("inputError");
            document.getElementById("errorveld1").classList.add("verborgen");
            if (ww2_value !== "") {
                if (ww1_value == ww2_value) {
                    ww2.classList.remove("inputError");
                    return true;
                }
                ww2.classList.add("inputError");
                document.getElementById("errorveld2").classList.remove("verborgen");
            }
        } else {
            document.getElementById("errorveld1").classList.remove("verborgen");
            ww1.classList.add("inputError");
        }
        return false;
    }
};

/* Check of het wachtwoord overeen en stuurt het dan naar de databse op */
$( document ).ready(function() {

    $(function () {
        $("#wachtwoordknop").on("click", function () {

            let wachtwoord;
            let nieuwWachtwoord = document.getElementById("nieuw_wachtwoord").value;
            let bevestigWachtwoord = document.getElementById("bevestig_wachtwoord").value

            if(nieuwWachtwoord !== "" && bevestigWachtwoord !== "") {
                if (nieuwWachtwoord === bevestigWachtwoord) {
                    wachtwoord = nieuwWachtwoord;
                }

                FYSCloud.API.queryDatabase(
                    "UPDATE profiel SET wachtwoord = ? WHERE id = ?", [wachtwoord, FYSCloud.Session.get("userid")]
                ).done(function (data) {
                    insertId = data["insertId"];
                    console.log(data);
                    alert("Nieuw wachtwoord is ingesteld!")
                    FYSCloud.URL.redirect("profiel.html");
                }).fail(function (data) {
                    console.log(data);
                });
            } else {
                alert("Velden mogen niet leeg zijn!")
            }
        });
    });
});