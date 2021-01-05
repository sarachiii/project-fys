$(document).ready(function () {

    //<---------------------------------------The filtering system----------------------------------------------->
    $(function () {
        const budgetSliderElement = $('#budget-slider');
        const budgetSliderElementValueText = $('#budget-slider-value');
        const ageSliderElement = $('#age-slider');
        const ageSliderElementValueText = $('#age-slider-value');
        const applyChanges = $('#apply-changes');
        const contentElement = $('#content');
        const rowElement = $('.my-row');

        //Stopt alle 'card' elementen in een array.
        let cards;

        const userId = FYSCloud.Session.get('userid');

        applyChanges.on('click', function () {
            const budgetSliderValue = budgetSliderElement.val();
            console.log({budgetSliderValue});
            const ageSliderValue = ageSliderElement.val();
            console.log({ageSliderValue});

            contentElement.children().remove();
            const newContentChild = $('<div></div>').addClass('row my-row');

            // then filter elements.
            cards.map(function (card) {
                const budget = $(card).data("budget");
                const age = $(card).data("age");
                if (budget <= budgetSliderValue && age <= ageSliderValue) {
                    newContentChild.append(card);
                }
                $(card).on('click', function () {
                    FYSCloud.URL.redirect("match-profiel.html", {
                        id: $(card).data('profile-id')
                    });
                });
            });

            contentElement.append(newContentChild);
        });

        budgetSliderElement.on('input', function (event) {
            budgetSliderElementValueText.text(event.target.value);
        });

        ageSliderElement.on('input', function (event) {
            ageSliderElementValueText.text(event.target.value);
        });

        //<-------------------12 beste match kaartjes aanmaken------------------------->
        //Sla de reisbestemming van de gebruiker op
        FYSCloud.API.queryDatabase("SELECT reisbestemming FROM profiel WHERE id = ?", [userId])
            .done(function (data) {

                let userbestemming = data[0].reisbestemming;
                console.log(userbestemming);

                FYSCloud.API.queryDatabase("SELECT Interesse_id FROM profiel_has_interesse WHERE Profiel_id = ?", [userId])
                    .done(function (data) {

                        let hobbygebruiker = data.map(data => data['Interesse_id']);
                        console.log(hobbygebruiker);

                        FYSCloud.API.queryDatabase(
                            "SELECT * " +
                            "FROM profiel " +
                            "INNER JOIN profiel_has_interesse " +
                            "ON profiel.id = profiel_has_interesse.Profiel_id " +
                            "WHERE id != ? " +
                            "ORDER BY FIELD(reisbestemming, ?) DESC, " +
                            "Interesse_id IN (?) DESC",
                            [userId, userbestemming, hobbygebruiker])
                            /*
                            "SELECT COUNT(Interesse_id IN (?))" +
                           "FROM" +
                           "(SELECT id, reisbestemming, Interesse_id " +
                           "FROM profiel " +
                           "INNER JOIN profiel_has_interesse " +
                           "ON profiel.id = profiel_has_interesse.Profiel_id " +
                           "WHERE id != ? " +
                           "ORDER BY FIELD(reisbestemming, ?) DESC, " +
                           "Interesse_id IN (?) DESC)" +
                           "AS x " +
                           "GROUP BY Profiel_id",
                            */
                            .done(function (data) {

                                let uniqueProfile = uniqByKeepLast(data, it => it.id);

                                uniqueProfile.map((profiel) => {
                                    let age = new Date().getFullYear() - new Date(profiel.geboortedatum).getFullYear();
                                    age = age < 18 ? 18 : age;
                                    rowElement.append(`
                            <div data-profile-id="${profiel.id}" class="col-xl-3  col-lg-6 my-col mt-2 w-2 card" data-budget="${profiel.budget}" data-age="${age}">
                                <img class="card-img-top mx-auto profile-picture" src="${profiel.profielfoto}" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title" data-firstName="voornaam" id="voornaam">${profiel.voornaam}, ${age}</h5>
                                    <p class="card-text" id="bestemming">Bestemming: ${profiel.reisbestemming}</p>
                                    <div class="flex">
                                    <p class="card-text"><strong>Budget: ${profiel.budget} euro</strong></p>
                                    </div>
                                </div>
                            </div>`
                                    );

                                    cards = $('.card').toArray();
                                    cards.map((card) => {
                                        $(card).on('click', function () {
                                            FYSCloud.URL.redirect("match-profiel.html", {
                                                id: $(card).data('profile-id')
                                            });
                                        });
                                    });
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

        // alleen de laatste waarde bewaren van de array a=array, key=waar hij op moet filteren (zie regel 90)
        function uniqByKeepLast(a, key) {
            return [
                ...new Map(
                    a.map(x => [key(x), x])
                ).values()
            ]
        }


        //<---------------------------------------The Card-filling system----------------------------------------------->
        /*FYSCloud.API.queryDatabase("SELECT * FROM profiel WHERE id != ? LIMIT 12", [userId])
            .done(function (data) {
                data.map((profiel) => {
                    let age = new Date().getFullYear() - new Date(profiel.geboortedatum).getFullYear();
                    age = age < 18 ? 18 : age;
                    rowElement.append(`
                    <div data-profile-id="${profiel.id}" class="col-xl-3  col-lg-6 my-col mt-2 w-2 card" data-budget="${profiel.budget}" data-age="${age}">
                        <img class="card-img-top mx-auto profile-picture" src="${profiel.profielfoto}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title" data-firstName="voornaam" id="voornaam">${profiel.voornaam}, ${age}</h5>
                            <p class="card-text" id="bestemming">Bestemming: ${profiel.reisbestemming}</p>
                            <div class="flex">
                            <p class="card-text"><strong>Budget: ${profiel.budget} euro</strong></p>
                            </div>
                        </div>
                    </div>`
                    );
                });*/
        /*cards = $('.card').toArray();
        cards.map((card) => {
            $(card).on('click', function () {
                FYSCloud.URL.redirect("match-profiel.html", {
                    id: $(card).data('profile-id')
                });
            });
        });*/
    });
});
