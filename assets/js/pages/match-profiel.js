$(document).ready(function () {
    //Stopt alle 'card' elementen in een array.
    const rowElement = $('#match-info');
    const id = FYSCloud.URL.queryString("id")
    console.log(id);

    //<---------------------------------------The Card-filling system----------------------------------------------->
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
