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

        FYSCloud.API.queryDatabase("SELECT reisbestemming FROM profiel WHERE id = ?", [userId])
            .done(function (data) {

                //Sla de reisbestemming van de gebruiker op
                let userbestemming = data[0].reisbestemming;
                console.log(userbestemming);

                FYSCloud.API.queryDatabase("SELECT Interesse_id FROM profiel_has_interesse WHERE Profiel_id = ?", [userId])
                    .done(function (data) {

                        //Sla de hobby's van de gebruiker op in een array
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

                            .done(function (data) {

                                //Bewaar alleen de unieke id's van de gesorteerde lijst
                                let uniqueProfile = uniqByKeepLast(data, it => it.id);

                                uniqueProfile.slice(0, 12).map((profiel) => {
                                    let age = new Date().getFullYear() - new Date(profiel.geboortedatum).getFullYear();
                                    rowElement.append(`
                            <div data-profile-id="${profiel.id}" class="col-xl-3  col-lg-6 my-col mt-2 w-2 card" data-budget="${profiel.budget}" data-age="${age}">
<!--                                <span class="teller"></span>-->
                                <img class="card-img-top mx-auto profile-picture" src="${profiel.profielfoto}" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title" data-firstName="voornaam" id="voornaam">${profiel.voornaam}, ${age}</h5>
                                    <p class="card-text" id="bestemming">Bestemming: ${profiel.reisbestemming}</p>
                                    <div class="flex">
                                    <p class="card-text"><strong>Budget: ${profiel.budget} euro</strong></p>
                                    <div class="card-ranking"></div>
                                    </div>
                                </div>
                            </div>`
                                    );

                                    // rowElement.find('.teller').text(i);
                                    // i++;

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

        //<-------------------12-24 beste match kaartjes aanmaken------------------------->
        $("#refresh").on("click", function () {
            FYSCloud.API.queryDatabase("SELECT reisbestemming FROM profiel WHERE id = ?", [userId])
                .done(function (data) {

                    //Sla de reisbestemming van de gebruiker op
                    let userbestemming = data[0].reisbestemming;
                    console.log(userbestemming);

                    FYSCloud.API.queryDatabase("SELECT Interesse_id FROM profiel_has_interesse WHERE Profiel_id = ?", [userId])
                        .done(function (data) {

                            //Sla de hobby's van de gebruiker op in een array
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

                                .done(function (data) {

                                    //Bewaar alleen de unieke id's van de gesorteerde lijst
                                    let uniqueProfile = uniqByKeepLast(data, it => it.id);

                                    uniqueProfile.slice(12, 24).map((profiel) => {
                                        let age = new Date().getFullYear() - new Date(profiel.geboortedatum).getFullYear();
                                        rowElement.append(`
                            <div data-profile-id="${profiel.id}" class="col-xl-3  col-lg-6 my-col mt-2 w-2 card" data-budget="${profiel.budget}" data-age="${age}">
                            <!--<span class="teller"></span>-->
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

        });

        // alleen de laatste waarde bewaren van de array (zie regel 90)
        function uniqByKeepLast(a, key) {
            return [
                ...new Map(
                    a.map(x => [key(x), x])
                ).values()
            ]
        }
    });
});
