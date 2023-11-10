console.log(obtenerCookie())
if (obtenerCookie().match("A")) {
    document.getElementById("botonesHomeErab").hidden = false;
}else if(obtenerCookie().match("NoLoged")){
    window.location = "HTML/Orokorra/Login.html";
}else{
    document.getElementById("botonesHomeErab").hidden = true;
}



function obtenerCookie() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith("AdminUser=")) {
            return cookie.substring("AdminUser=".length, cookie.length);
        }
    }
    return "NoLoged";
}
