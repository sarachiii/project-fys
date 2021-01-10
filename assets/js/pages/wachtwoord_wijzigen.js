/* Check of het wachtwoord overeen en stuurt het dan naar de databse op */
$( document ).ready(function() {
    $(function () {
        $("#wachtwoordknop").on("click", function () {
            const alertbox = $('.alertbox');
            const alertbox1 = $('.alertbox1');
            alertbox.children().remove();
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
                    window.setTimeout(function() {
                        FYSCloud.URL.redirect('profiel.html');
                    }, 1500);
                    alertbox1.append(
                        `<div class="alert alert-success" role="alert">
                                Nieuw wachtwoord is opgeslagen!       
                                </div>`);
                }).fail(function (data) {
                    console.log(data);
                });
            } else {
                alertbox.children().remove();
                alertbox.append(
                    `<div style="border-bottom: solid 2px" class="alert alert-danger" role="alert">
                    Vul eerst alle legen velden in.
                    </div>`);
                }
        });
    });
});

function check() {

    /* Patroon waar het wachtwoord aan voldoen moet */
    let regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})");
    let ww1 = document.getElementById("nieuw_wachtwoord");
    let ww1_value = ww1.value;
    let ww2 = document.getElementById("bevestig_wachtwoord");
    let ww2_value = ww2.value;

    /* Bij niet overeenkomend wachtwoord wordt er een div met de foutmelding op het scherm getoond,
    en het invoer vakje krijgt een rode kleur */

    if(ww1_value != "") {
        if (regex.test(ww1_value)) {
            ww1.classList.remove("inputError");
            ww1.classList.add("inputGood");
            document.getElementById("errorveld1").classList.add("verborgen");
            if (ww2_value !== "") {
                if (ww1_value == ww2_value) {
                    ww2.classList.add("inputGood");
                    ww2.classList.remove("inputError");
                    document.getElementById("errorveld2").classList.add("verborgen");
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
}