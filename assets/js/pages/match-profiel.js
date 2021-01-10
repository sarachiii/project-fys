$(document).ready(function () {

    const alertbox = $('.alertbox');
    //Stopt alle 'card' elementen in een array.
    const rowElement = $('#match-info');
    const id = FYSCloud.URL.queryString("id")
    const userId = FYSCloud.Session.get('userid');
    console.log(id);

    //<---------------------------------------The Card-filling system (leeftijd) ----------------------------------------------->
    FYSCloud.API.queryDatabase("SELECT geboortedatum FROM profiel WHERE id = ?", [id])
        .done(function (data) {
            let age = new Date().getFullYear() - new Date(data[0]["geboortedatum"]).getFullYear();
            $("#leeftijd").append(age);
        });

    //<---------------------------------------The Card-filling system (hobby's) ----------------------------------------------->
    FYSCloud.API.queryDatabase(
        "SELECT hobby FROM interesse INNER JOIN profiel_has_interesse ON profiel_has_interesse.Interesse_id = interesse.id_hobby WHERE Profiel_id = ?", [id]
    ).done(function (data) {
        for (let i = 0; i < data.length; i++) {
            $("#hobby").append(data[i]["hobby"] + "\n");
        }
    }).fail(function (data) {
        console.log(data);
    });

    //<---------------------------------------The Card-filling system (overige gegevens) ----------------------------------------------->
    FYSCloud.API.queryDatabase("SELECT voornaam, achternaam, gender, woonplaats, reisbestemming, budget, bio, profielfoto FROM profiel WHERE id = ?", [id])
        .done(function (data) {
            const [first] = data;
            console.log(first)
            Object.keys(first)
                .filter((keyName) => keyName !== 'profielfoto')
                .map((keyName) => {
                    rowElement.append(`
                        <tr>
                            <td class="text-muted">${keyName.charAt(0).toUpperCase() + keyName.slice(1)}</td>
                            <td>:</td>
                            <td id="${keyName}">${first[keyName]}</td>
                        </tr>
                    `
                    );
                });
            $('#profielplaatje').attr('src', first.profielfoto);
        });
    console.log(id);
//<---------------------------------------The Email sending system ----------------------------------------------->
    $("#sendEmail").on("click", function () {

        FYSCloud.API.queryDatabase(
            "SELECT voornaam, email FROM profiel WHERE id = ? OR id = ?",[id ,userId]
        ).done(function (profiel) {

            let profielNaam = profiel[1].voornaam;
            let profielEmail = profiel[1].email;

            let ingelogdeNaam = profiel[0].voornaam;
            let ingelogdeEmail = profiel[0].email;

            console.log(profiel);
            FYSCloud.API.sendEmail({
                from: {
                    name: "BudgetBuddy",
                    address: "group@fys.cloud"
                },
                to: [
                    {

                        name:profielEmail,
                        address: profielEmail
                    }
                ],
                subject: "Iemand van BudgetBuddy wilt met je praten!",
                html: `<h1>Hallo ${profielNaam}!</h1><p>${ingelogdeNaam} wil met jou in contact komen. Stuur een bericht: ${ingelogdeEmail}.</p>`
            }).done(function (data) {
                alertbox.append(
                    `<div class="alert alert-success" role="alert">
                    Er is een e-mail gestuurd naar de persoon, wacht het antwoord af :)
                    </div>`
                );
                console.log(data);
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

        document.getElementById('sendEmail').style.display = 'block';
        this.style.display = 'none'
    });
});
