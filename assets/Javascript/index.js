FYSCloud.API.configure({
    url: "https://api.fys.cloud",
    apiKey: "fys_is103_3.VhBW4tTTB1XVjWLN",
    database: "fys_is103_3_sarah",
    environment: "mockup"
});

FYSCloud.API.queryDatabase(
    "SELECT * FROM sarah WHERE name = 'Lennard' AND age <= 30" //dit moet nog aangepast worden
).done(function(data) {
    console.log(data);
}).fail(function(reason) {
    console.log(reason);
});