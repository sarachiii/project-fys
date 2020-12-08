$(document).ready(function () {

    //<---------------------------------------The filtering system----------------------------------------------->
    $(function () {
        const budgetSliderElement = $('#budget-slider');
        const budgetSliderElementValueText = $('#budget-slider-value');
        const ageSliderElement = $('#age-slider');
        const ageSliderElementValueText = $('#age-slider-value');
        const applyChanges = $('#apply-changes');
        const contentElement = $('#content');

        //Stopt alle 'card' elementen in een array.
        const cards = $('.card').toArray();
        console.log(cards);


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
        cards.map(function (card) {
            let id = 1;

            // card.val("voornaam").remove();

            FYSCloud.API.queryDatabase(
                "SELECT voornaam FROM profiel WHERE id = ?", [id]
            ).done(function (data) {
              card.append($("#voornaam").append(data[0]["voornaam"]));

            }).fail(function (data) {
                console.log(data);
            });

            id++;
        });

    });
});