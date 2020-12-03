$( document ).ready(function() {
    let profielfoto = 0;
    FYSCloud.API.queryDatabase(
        "SELECT * FROM profiel WHERE id = ?", [FYSCloud.Session.get("userid")]
    ).done(function(data) {

        document.getElementById("profielFoto").src = data[0].profielfoto;
        document.getElementById("firstName").value = data[0].voornaam;
        document.getElementById("lastName").value = data[0].achternaam;

        /* Controleert welk gender er in de database staat en markeert daarna de juiste radio button optie */

        if(data[0].gender === "Man"){
        $(':input:radio:eq(0)').attr('checked', true);
        }else if(data[0].gender === "Vrouw"){
            $(':input:radio:eq(1)').attr('checked', true);
        } else {
            $(':input:radio:eq(2)').attr('checked', true);
        }

        /*
        let datum = new Date(data[0]["geboortedatum"]).toLocaleDateString('en-US');
        document.getElementById("geboortedatum").value = data[0].datum;
        */

        /* Controleert welke woonplaats in de database staat en geeft daarna de juiste optie van het dropwdown menu weer in het formulier */
        switch (data[0].woonplaats){
            case "drenthe" :
                $('#woonplaats').find('option:eq(1)').attr('selected', true);
                break;
            case "flevoland" :
                $('#woonplaats').find('option:eq(2)').attr('selected', true);
                break;
            case "friesland" :
                $('#woonplaats').find('option:eq(3)').attr('selected', true);
                break;
            case "gelderland" :
                $('#woonplaats').find('option:eq(4)').attr('selected', true);
                break;
            case "groningen" :
                $('#woonplaats').find('option:eq(5)').attr('selected', true);
                break;
            case "limburg" :
                $('#woonplaats').find('option:eq(6)').attr('selected', true);
                break;
            case "noordbrabant" :
                $('#woonplaats').find('option:eq(7)').attr('selected', true);
                break;
            case "noordholland" :
                $('#woonplaats').find('option:eq(8)').attr('selected', true);
                break
            case "overijssel" :
                $('#woonplaats').find('option:eq(9)').attr('selected', true);
                break;
            case "utrecht" :
                $('#woonplaats').find('option:eq(10)').attr('selected', true);
                break;
            case "zeeland" :
                $('#woonplaats').find('option:eq(11)').attr('selected', true);
                break;
            case "zuidholland" :
                $('#woonplaats').find('option:eq(12)').attr('selected', true);
                break;
        }

        document.getElementById("budget").value = data[0].budget;

        /* Controleert welke woonplaats in de database staat en geeft daarna de juiste optie van het dropdown menu weer in het formulier*/
        switch (data[0].reisbestemming){
            case "nederland" :
                $('#reisbestemming').find('option:eq(1)').attr('selected', true);
                break
            case "bonaire" :
                $('#reisbestemming').find('option:eq(2)').attr('selected', true);
                break;
            case "bulgarije" :
                $('#reisbestemming').find('option:eq(3)').attr('selected', true);
                break;
            case "curacao" :
                $('#reisbestemming').find('option:eq(4)').attr('selected', true);
                break;
            case "egypte" :
                $('#reisbestemming').find('option:eq(5)').attr('selected', true);
                break;
            case "gambia" :
                $('#reisbestemming').find('option:eq(6)').attr('selected', true);
                break;
            case "griekenland" :
                $('#reisbestemming').find('option:eq(7)').attr('selected', true);
                break;
            case "indonesie" :
                $('#reisbestemming').find('option:eq(8)').attr('selected', true);
                break;
            case "italie" :
                $('#reisbestemming').find('option:eq(9)').attr('selected', true);
                break;
            case "kaapverdie" :
                $('#reisbestemming').find('option:eq(10)').attr('selected', true);
                break;
            case "macedonie" :
                $('#reisbestemming').find('option:eq(11)').attr('selected', true);
                break;
            case "portugal" :
                $('#reisbestemming').find('option:eq(12)').attr('selected', true);
                break;
            case "spanje" :
                $('#reisbestemming').find('option:eq(13)').attr('selected', true);
                break;
            case "turkije" :
                $('#reisbestemming').find('option:eq(14)').attr('selected', true);
                break;
        }
        $("#email").append(data[0]["gebruikersnaam"]);
    }).fail(function(data) {
    console.log(data);
    });


    /* Gewijzigde gegevens opslaan en naar database sturen */
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
            "WHERE id = ?", [firstName, lastName, woonplaats, bestemming, budget, email, wachtwoord, FYSCloud.Session.get("userid")]
        ).done(function (data) {
            insertId = data["insertId"];
            console.log(data);
            alert("Gegevens zijn opgeslagen!")
        }).fail(function (data) {
            console.log(data);
        });
    });


    /* Preview van profielfoto */
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
            let userid =  FYSCloud.Session.get("userid");
                FYSCloud.Utils
                .getDataUrl($("#profilePicture"))
                .done(function (data) {
                    insertId = data["insertId"];
                    console.log(data["extension"]);
                    console.log(userid);
                    FYSCloud.API.uploadFile(
                        userid + 'profielfoto.' + data["extension"],
                        data.url,
                        true
                    ).done(function (data) {
                        console.log(data);
                        FYSCloud.API.queryDatabase(
                            "UPDATE profiel SET profielfoto = ? WHERE id = ?", [data, userid]
                        ).done(function (data) {
                            alert("Je nieuwe profielfoto is ingesteld!");
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
        $(function() {
        $('#verwijder').click(function(e) {
            if(confirm("Are you sure?"))
            {
                FYSCloud.API.queryDatabase(
                    "DELETE FROM profiel WHERE id = ?", [FYSCloud.Session.get("userid")]
                ).done(function(data) {
                    console.log(data);
                    alert("Account is succesvol verwijderd.")
                    window.location.href = "index.html";
                }).fail(function(reason) {
                    console.log(reason);
                    alert("Account verwijderen mislukt.")
                });
            }
            else
            {
                e.preventDefault();
            }
                });
            });

        });
    });
