/* Profiel gegevens van de database halen */
FYSCloud.API.queryDatabase(
    "SELECT * FROM profiel"
).done(function(data) {
    $("#voornaam").append(data[0]["voornaam"]);
    $("#achternaam").append(data[0]["achternaam"]);
    $("#leeftijd").append(data[0]["geboortedatum"]);
    $("#geslacht").append(data[0]["gender"]);
    $("#woonplaats").append(data[0]["woonplaats"]);
    $("#email").append(data[0]["email"]);
    $("#reisbestemming").append(data[0]["reisbestemming"]);
    $("#budget").append(data[0]["budget"]);
    $("#bio").append(data[0]["bio"]);
}).fail(function(data) {
    console.log("Data niet geladen!");
});

/* Preview van foto */
$(function() {
    $("#profilePicture").on("change", function () {
        FYSCloud.Utils
            .getDataUrl($("#profilePicture"))
            .done(function(data) {
                if(data.isImage) {
                    $("#profilePreview").attr("src", data.url);
                }
            }).fail(function(reason) {
                console.log(reason);
            });
    });

    /* Profielfoto uploaden */

    $("#fileUploadButton").on("click", function () {
        FYSCloud.Utils
            .getDataUrl($("#profilePicture"))
            .done(function(data) {
                FYSCloud.API.uploadFile(
                    "test.png",
                    data.url,
                    true
                    ).done(function(data) {
                        console.log(data);
                        alert("Je nieuwe profielfoto is ingesteld!");
                    }).fail(function(reason) {
                       console.log("Het uploaden van je foto is mislukt!");
                    });
            }).fail(function(reason) {
                console.log(reason);
            });
    });

});