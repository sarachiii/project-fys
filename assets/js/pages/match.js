$(function () {
    const budgetSliderElement = $('#budget-slider');
    const ageSliderElement = $('#age-slider');
    const applyChanges = $('#apply-changes');
    const contentElement = $('#content');

    //Stopt alle 'card' elementen in een array.
    const cards = $('.card').toArray();
    console.log(cards);

    const budgets = [];
    const ages = [];

    //Stopt de budget values van 'budgetElements' in de 'budgets' array.
    cards.map(function (budgetElement) {
        budgets.push($(budgetElement).data("budget"));
    });
    console.log(budgets);

    //Stopt de age values van 'ageElements' in de 'ages' array.
    cards.map(function (ageElement) {
        ages.push($(ageElement).data("age"));
    });
    console.log(ages);

    budgetSliderElement.change(function (event) {
        const budgetSliderValue = event.target.value;
        console.log(budgetSliderValue);

        applyChanges.click(function () {
            //Hier worden de values die groter zijn dan de budgetSliderValue verwijderd.
            const filteredBudgetElements = cards.filter(function (Element) {
                if ($(Element).data("budget") <= budgetSliderValue) {
                    return Element;
                }
            });

            //Alle kaarten worden verwijderd van de pagina.
            contentElement.children().remove();

            // let template = "<div class='card'></div>";

            //De gefilterde content wordt terug geplaatst.
            const newContentChild = $('<div></div>').addClass('row justify-content-around my-row');

            // let totalElements = filteredBudgetElements.length;
            // if (totalElements % 4 === 0){
            //     contentElement.append(newContentChild);
            // }


            filteredBudgetElements.map(function (filteredElement) {
                newContentChild.append(filteredElement);
            });

            contentElement.append(newContentChild);
            console.log(filteredBudgetElements);
        })
    })

    ageSliderElement.change(function (event) {
        const ageSliderValue = event.target.value;
        console.log(ageSliderValue);

        applyChanges.click(function () {
            //Hier worden de values die groter zijn dan de budgetSliderValue verwijderd.
            const filteredAgeElements = cards.filter(function (Element) {
                if ($(Element).data("age") <= ageSliderValue) {
                    return Element;
                }
            });

            //Alle kaarten worden verwijderd van de pagina.
            contentElement.children().remove();

            //De gefilterde content wordt terug geplaatst.
            const newContentChild = $('<div></div>').addClass('row justify-content-around my-row');

            filteredAgeElements.map(function (filteredElement) {
                newContentChild.append(filteredElement);
            });
            contentElement.append(newContentChild);

            console.log(filteredAgeElements);


        })
    })
});
//
//
// // Wanneer de slider verandert, wordt de nieuwe value opgeslagen in deze variable.
// budgetSliderElement.change(function (event) {
//     const budgetSliderValue = event.target.value;
//     console.log(budgetSliderValue);
//
//     //Hier worden de values die groter zijn dan de budgetSliderValue verwijderd.
//     const filteredElements = cards.filter(function (Element) {
//         if ($(Element).data("budget") <= budgetSliderValue && $(Element).data("age") <= ageSliderValue) {
//             return Element;
//         }
//     });
//
//     //Alle kaarten worden verwijderd van de pagina.
//     contentElement.children().remove();
//
//     //De gefilterde content wordt terug geplaatst.
//     const newContentChild = $('<div></div>').addClass('row justify-content-around my-row');
//     const newContentChild2 = $('<div></div>').addClass('row justify-content-around my-row');
//     var cardCount = 0;
//
//
//     filteredElements.map(function (filteredElement) {
//         newContentChild.append(filteredElement);
//         cardCount++;
//         filteredElements.shift();
//         if (cardCount <= 4) {
//             filteredElements.map(function (filteredElement) {
//                 newContentChild2.append(filteredElement);
//             })
//         }
//     });
//     console.log(filteredElements);
//
//     contentElement.append(newContentChild);
//     contentElement.append(newContentChild2);
//
//     console.log(filteredElements);
//
//
// })
// })
// ;
