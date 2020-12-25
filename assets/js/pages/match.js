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

        //<---------------------------------------The Card-filling system----------------------------------------------->
        FYSCloud.API.queryDatabase("SELECT * FROM profiel WHERE id != ? LIMIT 12", [userId])
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
                });
                cards = $('.card').toArray();
                cards.map((card) => {
                    $(card).on('click', function () {
                        FYSCloud.URL.redirect("match-profiel.html", {
                            id: $(card).data('profile-id')
                        });
                    });
                });
            });
    });
});