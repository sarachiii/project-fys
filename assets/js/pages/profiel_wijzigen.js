FYSCloud.API.queryDatabase(
    "SELECT * FROM profiel"
).done(function(data) {
    $("#firstName").append(data[0]["naam"]);
    $("#leeftijd").append(data[0]["geboortedatum"]);
    $("#geslacht").append(data[0]["geslacht"]);
    $("#woonplaats").append(data[0]["woonplaats"]);
    $("#email").append(data[0]["email"]);
    $("#reisbestemming").append(data[0]["reisbestemming"]);
    $("#budget").append(data[0]["budget"]);
    $("#bio").append(data[0]["bio"]);
}).fail(function(data) {
    console.log("Data niet geladen!");
});