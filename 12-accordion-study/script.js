{
    const accHeaders = document.querySelectorAll(".accHeader");

    accHeaders.forEach(header => {
        header.addEventListener("click", () => {
            header.parentNode.classList.toggle("active");
        });
    });
}