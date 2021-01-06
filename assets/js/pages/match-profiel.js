$(document).ready(function () {
    //Stopt alle 'card' elementen in een array.
    const rowElement = $('#match-info');
    const id = FYSCloud.URL.queryString("id")
    console.log(id);

    //<---------------------------------------The Card-filling system (leeftijd) ----------------------------------------------->
    FYSCloud.API.queryDatabase("SELECT geboortedatum FROM profiel WHERE id = ?", [id])
        .done(function (data) {
            let age = new Date().getFullYear() - new Date(data[0]["geboortedatum"]).getFullYear();
            $("#leeftijd").append(age);
        });

    //<---------------------------------------The Card-filling system (hobby's) ----------------------------------------------->
    FYSCloud.API.queryDatabase(
        "SELECT hobby FROM interesse INNER JOIN profiel_has_interesse ON profiel_has_interesse.Interesse_id = interesse.id WHERE Profiel_id = ?", [FYSCloud.Session.get("userid")]
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

});
