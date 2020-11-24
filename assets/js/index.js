
/*
document.addEventListener('DOMContentLoaded', function (event){

    loginButton.onclick = function () {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        FYSCloud.API.queryDatabase(
            "SELECT * FROM login WHERE email = ? AND password = ?", [email, password]
        ).done(function(data) {

            if(data.length > 0) {
                alert("GELUKT")
            } else {
                alert("NIET GELUKT!")
            }
            console.log(data);
        }).fail(function(reason) {
            console.log(reason);
        });

    }
});
*/

/* Nog even een login pagina aanmaken zie fys-login-master file*/


/*
FYSCloud.Utils
    .getDataUrl($("#fileUploadButton"))
    .done(function(data) {
        if(data.isImage) {
            $("#imagePreview").attr("src", data.url);
        }
    }).fail(function(reason) {
    console.log(reason);
});

FYSCloud.Utils
    .getDataUrl($("#fileUploadButton"))
    .done(function(data) {
        FYSCloud.API.uploadFile(
            "test.png",
            data.url
        ).done(function(data) {
            console.log(data);
        }).fail(function(reason) {
            console.log(reason);
        });
    }).fail(function(reason) {
    console.log(reason);
});

 */