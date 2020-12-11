$( document ).ready(function() {

    /* Geregistreerde data in het formulier voor invullen */
    FYSCloud.API.queryDatabase(
        "SELECT * FROM profiel WHERE id = ?", [FYSCloud.Session.get("userid")]
    ).done(function(data) {

        document.getElementById("profielFoto").src = data[0].profielfoto;
        document.getElementById("firstName").value = data[0].voornaam;
        document.getElementById("lastName").value = data[0].achternaam;

        /* Controleert welk gender er in de database staat en markeert daarna de juiste radio button optie */
        switch(data[0].gender){
            case "Man" :
                $('#gender').find('option:eq(0)').attr('selected', true);
                break;
            case "Vrouw" :
                $('#gender').find('option:eq(1)').attr('selected', true);
                break;
            case "Anders":
                $('#gender').find('option:eq(2)').attr('selected', true);
                break;
        }

        let date = new Date(data[0]["geboortedatum"]).toLocaleDateString('en-CA', {year: 'numeric', month: 'numeric', day: 'numeric'});
        document.getElementById("geboortedatum").value = date;

       /* Controleert welke woonplaats in de database staat en geeft daarna de juiste optie van het dropwdown menu weer in het formulier */
        switch (data[0].woonplaats){
            case "Drenthe" :
                $('#woonplaats').find('option:eq(1)').attr('selected', true);
                break;
            case "Flevoland" :
                $('#woonplaats').find('option:eq(2)').attr('selected', true);
                break;
            case "Friesland" :
                $('#woonplaats').find('option:eq(3)').attr('selected', true);
                break;
            case "Gelderland" :
                $('#woonplaats').find('option:eq(4)').attr('selected', true);
                break;
            case "Groningen" :
                $('#woonplaats').find('option:eq(5)').attr('selected', true);
                break;
            case "Limburg" :
                $('#woonplaats').find('option:eq(6)').attr('selected', true);
                break;
            case "Noordbrabant" :
                $('#woonplaats').find('option:eq(7)').attr('selected', true);
                break;
            case "Noordholland" :
                $('#woonplaats').find('option:eq(8)').attr('selected', true);
                break
            case "Overijssel" :
                $('#woonplaats').find('option:eq(9)').attr('selected', true);
                break;
            case "Utrecht" :
                $('#woonplaats').find('option:eq(10)').attr('selected', true);
                break;
            case "Zeeland" :
                $('#woonplaats').find('option:eq(11)').attr('selected', true);
                break;
            case "Zuidholland" :
                $('#woonplaats').find('option:eq(12)').attr('selected', true);
                break;
        }

        document.getElementById("budget").value = data[0].budget;

        /* Controleert welke woonplaats in de database staat en geeft daarna de juiste optie van het dropdown menu weer in het formulier*/
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
            case "curacao" :
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
            case "Indonesie" :
                $('#reisbestemming').find('option:eq(8)').attr('selected', true);
                break;
            case "Italie" :
                $('#reisbestemming').find('option:eq(9)').attr('selected', true);
                break;
            case "Kaapverdie" :
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

        /* Bio tekstje */
        document.getElementById("bio").value = data[0].bio;

    }).fail(function(data) {
    console.log(data);
    });


    /* Gewijzigde gegevens opslaan en naar database sturen */
    $("#opslaan").on("click", function () {

        let userid = FYSCloud.Session.get("userid");
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let gender = document.getElementById("gender").value;
        let geboortedatum = document.getElementById("geboortedatum").value;
        let woonplaats = document.getElementById("woonplaats").value;
        let bestemming = document.getElementById("reisbestemming").value;
        let budget = document.getElementById("budget").value;
        let bio = document.getElementById("bio").value;

        /* Hobby's doorsturen naar database */
        let interesses = document.querySelectorAll('#multiple-checkboxes option:checked');
        const values = Array.from(interesses).map(el => el.value);
        console.log(values);

        for (let i = 0; i < values.length; i++) {
            let interesses = values[i];
            FYSCloud.API.queryDatabase("INSERT INTO profiel_has_interesse (Profiel_id, Interesse_id) VALUES (?, ?)", [userid, interesses])
                .done(function (data) {
                    console.log(data);
                }).fail(function (data) {
                console.log(data);
            });
        }

        FYSCloud.API.queryDatabase(
            "UPDATE profiel SET " +
            "voornaam = ?, " +
            "achternaam = ?, " +
            "gender = ?, " +
            "geboortedatum = ?, " +
            "woonplaats = ?, " +
            "reisbestemming = ?, " +
            "budget = ?, " +
            "bio = ? " +
            "WHERE id = ?", [firstName, lastName, gender, geboortedatum, woonplaats, bestemming, budget, bio, userid]
        ).done(function (data) {
            console.log(data);
            alert("Gegevens zijn opgeslagen!")
            window.location.href = "profiel.html";
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
