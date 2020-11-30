$(document).ready(function () {
    $("#registreren").on("click", function () {
        let firstName = document.getElementById("firstName").value;
        let insertId = 0
        let lastName = document.getElementById("lastName").value;
        FYSCloud.API.queryDatabase(
            "INSERT INTO profiel(voornaam,achternaam) values(?,?)", [firstName, lastName]
        ).done(function (data) {
            insertId = data["insertId"];
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
                        }).fail(function (data) {
                            console.log(data);
                        });
                    }).fail(function (reason) {
                        console.log("Het uploaden van je foto is mislukt!");
                    });
                }).fail(function (reason) {
                console.log(reason);
            });
        }).fail(function (data) {
            console.log(data);
        });
    });
});