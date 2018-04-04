//Limpia el formulario al añadir Universidad
function resetForm() {
    document.getElementById("addUni").reset();
    document.getElementById("updateUni").reset();
}

/*function fillForUpdate(){
    console.log("hello");
}*/

$(".addNewUniversity").click(function() {
    $('html,body').animate({
        scrollTop: $(".addModificate").offset().top},
        'slow');
});