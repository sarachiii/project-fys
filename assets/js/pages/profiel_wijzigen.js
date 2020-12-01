$( document ).ready(function() {
    let profielfoto = 0;
    FYSCloud.API.queryDatabase(
        "SELECT * FROM profiel"
    ).done(function(data) {

        document.getElementById("profielFoto").src = data[0].profielfoto;
        document.getElementById("firstName").value = data[0].voornaam;
        document.getElementById("lastName").value = data[0].achternaam;

        /* Controleert welk gegeven er in de database staat en markeert daarna de juiste radio button optie */

        if(data[0].gender === "man"){
        $(':input:radio:eq(0)').attr('checked', true);
        }else if(data[0].gender === "vrouw"){
            $(':input:radio:eq(1)').attr('checked', true);
        } else {
            $(':input:radio:eq(2)').attr('checked', true);
        }

        /*
        let datum = new Date(data[0]["geboortedatum"]).toLocaleDateString('en-US');
        document.getElementById("geboortedatum").value = data[0].datum;
        */

        /* Controlleert welke woonplaats in de database staat en geeft daarna de juiste optie weer */
        switch (data[0].woonplaats){
            case "Drenthe" :
                $('#woonplaats').find('option:eq(1)').attr('selected', true);
                break;
            case "Flevoland" :
                $('#woonplaats').find('option:eq(2)').attr('selected', true);
                break;
            case "Gelderland" :
                $('#woonplaats').find('option:eq(3)').attr('selected', true);
                break;
            case "Groningen" :
                $('#woonplaats').find('option:eq(4)').attr('selected', true);
                break;
            case "Limburg" :
                $('#woonplaats').find('option:eq(5)').attr('selected', true);
                break;
            case "Noord-Brabant" :
                $('#woonplaats').find('option:eq(6)').attr('selected', true);
                break;
            case "Noord-Holland" :
                $('#woonplaats').find('option:eq(7)').attr('selected', true);
                break
            case "Overijssel" :
                $('#woonplaats').find('option:eq(8)').attr('selected', true);
                break;
            case "Utrecht" :
                $('#woonplaats').find('option:eq(9)').attr('selected', true);
                break;
            case "Zeeland" :
                $('#woonplaats').find('option:eq(11)').attr('selected', true);
                break;
            case "Zuid-Holland" :
                $('#woonplaats').find('option:eq(12)').attr('selected', true);
                break;
        }

        document.getElementById("budget").value = data[0].budget;

        /* Controlleert welke woonplaats in de database staat en geeft daarna de juiste optie weer */
        switch (data[0].reisbestemming){
            case "Nederland" :
                $('#reisbestemming').find('option:eq(1)').attr('selected', true);
                break
            case "Bonaire" :
                $('#reisbestemming').find('option:eq(2)').attr('selected', true);
                break;
            case "Bulgarije" :
                $('#reisbestemming').find('option:eq(3)').attr('selected', true);
                break;
            case "Curaçao" :
                $('#reisbestemming').find('option:eq(4)').attr('selected', true);
                break;
            case "Egypte" :
                $('#reisbestemming').find('option:eq(5)').attr('selected', true);
                break;
            case "Gambia" :
                $('#reisbestemming').find('option:eq(6)').attr('selected', true);
                break;
            case "Griekenland" :
                $('#reisbestemming').find('option:eq(7)').attr('selected', true);
                break;
            case "Indonesië" :
                $('#reisbestemming').find('option:eq(8)').attr('selected', true);
                break;
            case "Italië" :
                $('#reisbestemming').find('option:eq(9)').attr('selected', true);
                break;
            case "Kaapverdië" :
                $('#reisbestemming').find('option:eq(10)').attr('selected', true);
                break;
            case "Macedonie" :
                $('#reisbestemming').find('option:eq(11)').attr('selected', true);
                break;
            case "Portugal" :
                $('#reisbestemming').find('option:eq(12)').attr('selected', true);
                break;
            case "Spanje" :
                $('#reisbestemming').find('option:eq(13)').attr('selected', true);
                break;
            case "Turkije" :
                $('#reisbestemming').find('option:eq(14)').attr('selected', true);
                break;
        }
        $("#email").append(data[0]["gebruikersnaam"]);
    }).fail(function(data) {
    console.log(data);
    });


    /* Gegevens opslaan */
    $("#opslaan").on("click", function () {

        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let woonplaats = document.getElementById("woonplaats").value;
        let bestemming = document.getElementById("reisbestemming").value;
        let budget = document.getElementById("budget").value;
        let email = document.getElementById("nieuw_email").value;
        let wachtwoord;

        let nieuwWachtwoord = document.getElementById("nieuw_wachtwoord").value;
        let bevestigWachtwoord =  document.getElementById("bevestig_wachtwoord").value
        if(nieuwWachtwoord === bevestigWachtwoord) {
            wachtwoord = nieuwWachtwoord;
        } else {
            alert("Wachtwoord is niet hetzelfde.")
        }

        FYSCloud.API.queryDatabase(
            "UPDATE profiel SET voornaam = ?, " +
            "achternaam = ?, " +
            "woonplaats = ?, " +
            "reisbestemming = ?, " +
            "budget = ?, " +
            "gebruikersnaam = ?, " +
            "wachtwoord = ? " +
            "WHERE id = 1", [firstName, lastName, woonplaats, bestemming, budget, email, wachtwoord]
        ).done(function (data) {
            insertId = data["insertId"];
            console.log(data);
            alert("Gegevens zijn opgeslagen!")
        }).fail(function (data) {
            console.log(data);
        });
    });


    /* Preview van foto */
    $(function () {
        $("#profilePicture").on("change", function () {
            FYSCloud.Utils
                .getDataUrl($("#profilePicture"))
                .done(function (data) {
                    if (data.isImage) {
                        $("#profielFoto").attr("src", data.url);
                    }
                }).fail(function (reason) {
                console.log(reason);
            });
        });

        /* Profielfoto uploaden */

        $("#fileUploadButton").on("click", function () {
            let insertId = 0
                FYSCloud.Utils
                .getDataUrl($("#profilePicture"))
                .done(function (data) {
                    insertId = data["insertId"];
                    console.log(data["extension"]);
                    console.log(insertId);
                    FYSCloud.API.uploadFile(
                        insertId + 'profielfoto.' + data["extension"],
                        data.url,
                        true
                    ).done(function (data) {
                        console.log(data);
                        FYSCloud.API.queryDatabase(
                            "UPDATE profiel SET profielfoto = ? where id = ?", [data, insertId]
                        ).done(function (data) {
                            alert("Je nieuwe profielfoto is ingesteld!");
                            let insertId = data["insertId"];
                        }).fail(function (data) {
                            console.log(data);
                        });
                    }).fail(function (reason) {
                        console.log(reason);
                    });
                }).fail(function (reason) {
                    console.log(reason);
                });
        });

        /* Account verwijderen */

        $("#verwijder").on("click", function () {

            /* Id moet nog aangepast worden*/
        FYSCloud.API.queryDatabase(
            "DELETE FROM profiel WHERE id = 2"
        ).done(function(data) {
            console.log(data);
            alert("account is succesvol verwijderd.")
            window.location.href = "index.html";
        }).fail(function(reason) {
            console.log(reason);
            alert("Account verwijderen mislukt.")
        });
        });
    });
});


