function firstNameCheck() {
    let firstNameExp = new RegExp(/^([^0-9!@#$%^&§€*]*)$/);
    let uncheckedFirstName = document.getElementById("firstName");
    let uncheckedFirstNameValue = uncheckedFirstName.value;

    if (uncheckedFirstNameValue !== "") {
        if (firstNameExp.test(uncheckedFirstNameValue)) {
            uncheckedFirstName.classList.remove("inputError");
            document.getElementById("error-firstname").classList.add("onzichtbaar");
        } else {
            document.getElementById("error-firstname").classList.remove("onzichtbaar");
            uncheckedFirstName.classList.add("inputError");
        }
        return false;
    }
}

function lastNameCheck() {
    let lastNameExp = new RegExp(/^([^0-9!@#$%^&§€*]*)$/);
    let uncheckedLastName = document.getElementById("lastName");
    let uncheckedLastNameValue = uncheckedLastName.value;

    if (uncheckedLastNameValue !== "") {
        if (lastNameExp.test(uncheckedLastNameValue)) {
            uncheckedLastName.classList.remove("inputError");
            document.getElementById("error-lastname").classList.add("onzichtbaar");
        } else {
            document.getElementById("error-lastname").classList.remove("onzichtbaar");
            uncheckedLastName.classList.add("inputError");
        }
        return false;
    }
}

function budgetCheck() {
    let budgetExp = new RegExp(/^\d{2,4}$/);
    let uncheckedBudget = document.getElementById("budget");
    let uncheckedBudgetValue = uncheckedBudget.value;

    if (uncheckedBudgetValue !== "") {
        if (budgetExp.test(uncheckedBudgetValue)) {
            uncheckedBudget.classList.remove("inputError");
            document.getElementById("error-reisbudget").classList.add("onzichtbaar");
        } else {
            document.getElementById("error-reisbudget").classList.remove("onzichtbaar");
            uncheckedBudget.classList.add("inputError");
        }
        return false;
    }
}

function passwordCheck() {
    let passwordExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})");
    let uncheckedPassword = document.getElementById("user-password");
    let uncheckedPasswordValue = uncheckedPassword.value;

    if (uncheckedPasswordValue !== "") {
        if (passwordExp.test(uncheckedPasswordValue)) {
            uncheckedPassword.classList.remove("inputError");
            document.getElementById("error-password").classList.add("onzichtbaar-2");
        } else {
            document.getElementById("error-password").classList.remove("onzichtbaar-2");
            uncheckedPassword.classList.add("inputError");
        }
        return false;
    }
}

let uncheckedEmailValue;
let uncheckedEmail;

function emailCheck() {
    let emailExp = new RegExp(/^([a-z.\d_-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/);
    uncheckedEmail = document.getElementById("email");
    uncheckedEmailValue = uncheckedEmail.value;

    if (uncheckedEmailValue !== "") {
        if (emailExp.test(uncheckedEmailValue)) {
            uncheckedEmail.classList.remove("inputError");
            document.getElementById("error-email").classList.add("onzichtbaar");
            return checkEmailAvailable();
        } else {
            document.getElementById("error-email").classList.remove("onzichtbaar");
            uncheckedEmail.classList.add("inputError");
        }
        return false;
    }
}

function checkEmailAvailable() {
    if (uncheckedEmailValue !== "") {
        FYSCloud.API.queryDatabase(
            "SELECT email FROM profiel WHERE email = ?", [uncheckedEmailValue]
        ).done(function (data) {
            if (data.length > 0) {
                console.log("dit email bestaat al");
                uncheckedEmail.classList.add("inputError");
                document.getElementById("email-availability").classList.remove("onzichtbaar-1");
            } else {
                uncheckedEmail.classList.add("inputValid");
                document.getElementById("email-availability").classList.add("onzichtbaar-1");
            }
        }).fail(function (reason) {
            console.log(reason);
        });
    }
}

function bioCheck() {
    let uncheckedBio = document.getElementById("bio");
    let uncheckedBioValue = uncheckedBio.value;

    if (uncheckedBioValue !== "") {
        uncheckedBio.classList.remove("inputError");
        document.getElementById("error-bio").classList.add("onzichtbaar");
    } else {
        document.getElementById("error-bio").classList.remove("onzichtbaar");
        uncheckedBio.classList.add("inputError");
    }
}

function privacyCheck(){
    let privacy = document.getElementById("privacy");
    let privacyVeld = document.getElementById("error-privacy");
    if (privacy.checked === false) {
        privacyVeld.classList.remove("onzichtbaar");
    } else {
        privacyVeld.classList.add("onzichtbaar");
    }
}

$(document).ready(function () {
    $("#registreren").on("click", function () {
        const alertbox = $('.alertbox');
        let insertId = 0;
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let gender = document.getElementById("gender").value;
        let woonplaats = document.getElementById("woonplaats").value;
        let budget = document.getElementById("budget").value;
        let reisbestemming = document.getElementById("reisbestemming").value;
        let gebruikersnaam = document.getElementById("email").value;
        let wachtwoord = document.getElementById("user-password").value;
        let geboortedatum = document.getElementById("geboortedatum").value;
        let bio = document.getElementById("bio").value;
        let profielfoto = document.getElementById("profielfoto").value;
        let privacy = document.getElementById("privacy");
        let privacyVeld = document.getElementById("error-privacy");

        if (firstName === "" || lastName === "" || profielfoto === "" || gender === "" || woonplaats === "" || budget === "" || reisbestemming === "" ||
            gebruikersnaam === "" || wachtwoord === "" || bio === "" || geboortedatum === "") {

            alertbox.children().remove();
            alertbox.append(
                `<div class="alert alert-danger" role="alert">
                    Er zijn nog lege velden. Controleer uw registratie.       
                    </div>`);
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        } else {
            alertbox.children().remove()

            //Checkt of privacy is aangevinkt
            if (privacy.checked === false) {
                privacyVeld.classList.remove("onzichtbaar");
            } else {
                privacyVeld.classList.add("onzichtbaar");
                send();
            }
        }
    });
});

let insertId;

function send() {
    /* Voornaam, achternaam, gender, woonplaats, budget, reisbestemming, e-mail, wachtwoord, biografie
    en geboortedatum uploaden naar de database binnen een specifiek profiel mits de velden niet leeg zijn*/
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let gender = document.getElementById("gender").value;
    let woonplaats = document.getElementById("woonplaats").value;
    let budget = document.getElementById("budget").value;
    let reisbestemming = document.getElementById("reisbestemming").value;
    let gebruikersnaam = document.getElementById("email").value;
    let wachtwoord = document.getElementById("user-password").value;
    let geboortedatum = document.getElementById("geboortedatum").value;
    let bio = document.getElementById("bio").value;

    FYSCloud.API.queryDatabase(
        "INSERT INTO profiel(voornaam,achternaam,gender,woonplaats,budget,reisbestemming,email,wachtwoord,bio,geboortedatum)" +
        "values(?,?,?,?,?,?,?,?,?,?)",
        [firstName, lastName, gender, woonplaats, budget, reisbestemming, gebruikersnaam, wachtwoord, bio, geboortedatum]
    ).done(function (data) {
        insertId = data["insertId"];
        insertInteresse(insertId);
    }).fail(function (reason) {
        console.log(reason);
    });

    /* Profielfoto uploaden naar de database binnen een specifiek profiel en de gebruiker na het invullen
    van het registratieformulier redirecten naar de inlogpagina mits het veld niet leeg is */
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
                    window.setTimeout(function () {
                        FYSCloud.URL.redirect('login.html');
                    }, 3000);
                    const alertbox1 = $('.alertbox1');
                    alertbox1.append(
                        `<div class="alert alert-success" role="alert">
                                Gefeliciteerd, uw registratie is gelukt.
                                </div>`);
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                }).fail(function (data) {
                    console.log(data);
                });
            }).fail(function (data) {
                console.log(data);
            });
        }).fail(function (data) {
        console.log(data);
    });

    /* Interesses/hobby's uploaden naar de database */
    function insertInteresse(insertId) {

        let interesses = document.querySelectorAll('#multiple-checkboxes option:checked');
        const values = Array.from(interesses).map(el => el.value);
        console.log(values);

        for (let i = 0; i < values.length; i++) {
            let interesses = values[i];
            FYSCloud.API.queryDatabase("INSERT INTO profiel_has_interesse (Profiel_id, Interesse_id) VALUES (?, ?)", [insertId, interesses])
                .done(function (data) {
                }).fail(function (data) {
                console.log(data);
            });
        }
    }
}
