//Limpia el formulario al añadir Universidad
function resetForm() {
    document.getElementById("addUni").reset();
    document.getElementById("updateUni").reset();
}

/*function fillForUpdate(){
    console.log("hello");
}*/

function ScrollToAddUniversity(){
    $('html,body').animate({
        scrollTop: $(".addModificate").offset().top},
        'slow');
}

function ScrollToSearchUniversity(){
    $('html,body').animate({
        scrollTop: $(".searchUniversity").offset().top},
        'slow');
}

