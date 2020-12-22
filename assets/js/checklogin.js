$( document ).ready(function() {
    if(FYSCloud.Session.get("userid") == null){
        FYSCloud.URL.redirect("login.html");
    }
});