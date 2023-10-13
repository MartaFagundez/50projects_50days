{
  const btn = document.getElementById("btn");

  btn?.addEventListener("click", () => {
    btn.disabled = true;

    document.body.classList.add("reloading");
    // Desvanecer las imágenes antes de recargar la página
    setTimeout(() => {
      location.reload();
    }, 500); // Recargar la página después de que la transición de opacidad haya terminado

    // Mantener el botón inhabilitado por 5 segundos para evitar que se hagan demasiadas peticiones seguidas a la api
    setTimeout(() => {
      btn.disabled = false;
    }, 5000);
  });

  // Devolver la opacidad completa a las imágenes cuando la página se recargue
  window.addEventListener("beforeunload", () => {
    document.body.classList.remove("reloading");
  });
}
