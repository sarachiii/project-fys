$(document).ready(function () {
    if(check(true)) {
        $("#reset").on("click", function () {
            let email = document.getElementById("inputEmail");
            let emailValue = email.value;
            const alertbox = $('.alertbox');

            if (emailValue !== "") {
                FYSCloud.API.queryDatabase(
                    "SELECT voornaam, wachtwoord FROM profiel WHERE email = ?", [emailValue]
                ).done(function (profiel) {

                    let voornaam = profiel[0].voornaam;
                    let wachtwoord = profiel[0].wachtwoord;

                    FYSCloud.API.sendEmail({
                        from: {
                            name: "BudgetBuddy",
                            address: "group@fys.cloud"
                        },
                        to: [
                            {
                                name: voornaam,
                                address: emailValue
                            }
                        ],
                        subject: "Wachtwoord BudgetBuddy",
                        html: `<h1>Hallo ${voornaam}!</h1><p>Uw wachtwoord is: ${wachtwoord} </p>`
                    }).done(function (data) {
                        alertbox.append(
                            `<div class="alert alert-success" role="alert">
                    Er is een e-mail verstuurd met instructies.
                    </div>`
                        );
                    }).fail(function (reason) {
                        alertbox.append(
                            `<div class="alert alert-danger" role="alert">
                    Er is iets fout gegaan.                 
                    </div>`);
                        console.log(reason);
                    });
                }).fail(function (reason) {
                    console.log(reason);
                });
            } else {
                email.classList.add("inputError");
                document.getElementById("errorveld3").classList.remove("verborgen");
            }
        });
    }
});

function check() {
    let email = document.getElementById("inputEmail");
    let emailValue = email.value;

    /* checkt of het email in de database voorkomt, maar alleen als er iets in het veld is ingevuld */
    if (emailValue !== "") {
        FYSCloud.API.queryDatabase(
            "SELECT email FROM profiel WHERE email = ?", [emailValue]
        ).done(function (data) {
            if (data.length > 0) {
                email.classList.add("inputGood");
                document.getElementById("errorveld3").classList.add("verborgen");

            } else {
                email.classList.add("inputError");
                document.getElementById("errorveld3").classList.remove("verborgen");
            }
        }).fail(function (data) {
            console.log(data);
        });
        return true;
    }
    return false;
}