{
    const btn = document.getElementById("btn");

    btn?.addEventListener("click", function(){
        location.reload();
        return false;
    });

    // Inhabilitar el botón por 3 segundos para evitar que se hagan demasiadas peticiones seguidas a la api
    btn.disabled = true;
    setTimeout(function() {
        btn.disabled = false;
    }, 3000);

}