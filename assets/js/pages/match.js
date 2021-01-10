let budgetSliderElement;
let uniqueProfile;
let rowElement;
let userId;
let cards;
let gefilterdeProfielen = [];
let i = 0; //teller die bijhoudt op welke pagina je bent
let j = 1; //teller die de nummers op de kaartjes zet

$(document).ready(function () {
    //<---------------------------------------The filtering system----------------------------------------------->
    $(function () {
        getUsers();
        budgetSliderElement = $('#budget-slider');
        const budgetSliderElementValueText = $('#budget-slider-value');
        const ageSliderElement = $('#age-slider');
        const ageSliderElementValueText = $('#age-slider-value');
        const applyChanges = $('#apply-changes');
        //const contentElement = $('#content');

        rowElement = $('.my-row');

        //Stopt alle 'card' elementen in een array.
        userId = FYSCloud.Session.get('userid');

        applyChanges.on('click', function () {
            const budgetSliderValue = budgetSliderElement.val();
            console.log({budgetSliderValue});
            const ageSliderValue = ageSliderElement.val();
            console.log({ageSliderValue});

            gefilterdeProfielen = [];
            // then filter elements.
            uniqueProfile.map(function (profiel) {
                const budget = profiel.budget;
                const age = new Date().getFullYear() - new Date(profiel.geboortedatum).getFullYear();
                if (budget <= budgetSliderValue && age <= ageSliderValue) {
                    gefilterdeProfielen.push(profiel);
                }
            });
            i = 0;
            showUsers();
        });

        budgetSliderElement.on('input', function (event) {
            budgetSliderElementValueText.text(event.target.value);
        });

        ageSliderElement.on('input', function (event) {
            ageSliderElementValueText.text(event.target.value);
        });
    });
});

function getUsers() {
    userId = FYSCloud.Session.get('userid');

    FYSCloud.API.queryDatabase("SELECT reisbestemming FROM profiel WHERE id = ?", [userId])
        .done(function (data) {

            //Sla de reisbestemming van de gebruiker op
            let userbestemming = data[0].reisbestemming;

            FYSCloud.API.queryDatabase("SELECT Interesse_id FROM profiel_has_interesse WHERE Profiel_id = ?", [userId])
                .done(function (data) {

                    //Sla de hobby's van de gebruiker op in een array
                    let hobbygebruiker = data.map(data => data['Interesse_id']);

                    FYSCloud.API.queryDatabase(
                        "SELECT * " +
                        "FROM ((profiel " +
                        "INNER JOIN profiel_has_interesse " +
                        "ON profiel.id = profiel_has_interesse.Profiel_id) " +
                        "INNER JOIN interesse " +
                        "ON profiel_has_interesse.Interesse_id = interesse.id_hobby )" +
                        "WHERE id != ? " +
                        "ORDER BY FIELD(reisbestemming, ?) DESC, " +
                        "Interesse_id IN (?) DESC",
                        [userId, userbestemming, hobbygebruiker])

                        .done(function (data) {

                            //Bewaar alleen de unieke id's van de gesorteerde lijst
                            uniqueProfile = uniqByKeepLast(data, it => it.id);
                            gefilterdeProfielen = uniqueProfile;
                            showUsers();
                        });
                });
        });
};

//<-------------------12 beste match kaartjes vullen------------------------->
function showUsers() {
    rowElement.children().remove();
    if(gefilterdeProfielen.length == 0){
        rowElement.append(`
        <div class="geenResultaat"><p>Geen resultaat...</p></div>`
        );
    }
    if(i == 0){
      j = 1;
    } else if (i == 1){
        j = 13;
    } else {
        j = 25;
    }

    // pakt steeds intervallen van 12 (0-12), (12-24), (24-36) uit de array
    gefilterdeProfielen.slice(12 * i, (12 * i) + 12).map((profiel) => {
        let age = new Date().getFullYear() - new Date(profiel.geboortedatum).getFullYear();
        rowElement.append(`
                            <div data-profile-id="${profiel.id}" class="col-xl-3  col-lg-6 my-col mt-2 w-2 card" data-budget="${profiel.budget}" data-age="${age}">
                                <span class="teller" style="font-size:180%; color: crimson;">${j} &starf;</span>
                                <img class="card-img-top mx-auto profile-picture" src="${profiel.profielfoto}" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title" data-firstName="voornaam" id="voornaam">${profiel.voornaam}, ${age}</h5>
                                    <p class="card-text" id="bestemming">Bestemming: ${profiel.reisbestemming}</p>
                                     <p>Hobby's: ${profiel.hobby}</p>
                                    <div class="flex">
                                    <p class="card-text"><strong>Budget: ${profiel.budget} euro</strong></p>
                                    </div>
                                </div>
                            </div>`
        );
        j++;
    });
    cards = $('.card').toArray();

    cards.map((card) => {
        $(card).on('click', function () {
            FYSCloud.URL.redirect("match-profiel.html", {
                id: $(card).data('profile-id')
            });
        });
    });
};

//Functie voor volgende knop
$("#volgendematch").on("click", function () {
    //Kan alleen 3 pagina's verder geklikt worden
    console.log(j);
    if (i < 2) {
        i++;
        showUsers();
        // if(gefilterdeProfielen.length % 12 == 0) {
        //     showUsers();
        // }
    }
});

//Functie voor vorige knop
$("#vorigematch").on("click", function () {
    //Kan niet uitgevoerd worden als de gebruiker zich op de eerste pagina bevindt, dus alleen als i groter is dan 0
    if (i > 0) {
        i--;
        if(gefilterdeProfielen.length > 0)
        showUsers();
    }
});

// alleen de laatste waarde bewaren van de array
function uniqByKeepLast(a, key) {
    return [
        ...new Map(
            a.map(x => [key(x), x])
        ).values()
    ]
};

