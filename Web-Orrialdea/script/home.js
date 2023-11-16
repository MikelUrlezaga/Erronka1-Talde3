console.log(obtenerCookie())
if (obtenerCookie().match("A")) {
    document.getElementById("botonesHomeErab").hidden = false;
}else if(obtenerCookie().match("NoLoged")){
    window.location = "HTML/Orokorra/Login.html";
}else{
    document.getElementById("botonesHomeErab").hidden = true;
}
