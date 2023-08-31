{
    const panels = document.querySelectorAll(".panel");

    panels.forEach(panel => {
        panel.addEventListener("click", () => {
            removeActiveClasses();
            addActiveClass(panel);
        });
    });

    function addActiveClass(element) {
        element.classList.add("active");
    }

    function removeActiveClasses() {
        panels.forEach(panel => {
            panel.classList.remove("active");
        });
    }
}