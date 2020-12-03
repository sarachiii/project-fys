document.addEventListener('DOMContentLoaded', function (event){
    $('#loguit').click(function(){
        FYSCloud.Session.clear();
        alert("Je bent uitgelogd!")
    });
});