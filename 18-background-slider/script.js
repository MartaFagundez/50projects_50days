{
    const body = document.body;
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const bgColorContainer = document.getElementById("bgColorContainer");

    window.onresize = resize; // Para detectar los cambios de tamaño de la pantalla y cambiar la imagen de fondo si es necesario

    let activeSlide = 0;

    nextBtn?.addEventListener("click", () => {
        activeSlide++;

        if (activeSlide > slides.length - 1) {
            activeSlide = 0;
        }

        setActiveSlide();
        setBgToBody();
    });

    prevBtn?.addEventListener("click", () => {
        activeSlide--;

        if (activeSlide < 0) {
            activeSlide = slides.length - 1;
        }

        setActiveSlide();
        setBgToBody();
    });

    resize();
    setBgToBody();

    

     function setBgToBody() {
        body.style.backgroundImage = slides[activeSlide].style.backgroundImage;
        
        if (bgColorContainer != null) {
            switch (activeSlide) {
                case 0:
                    bgColorContainer.style.backgroundColor = "var(--orange-multiply)";
                    console.log(bgColorContainer.style.backgroundColor);
                    break;
                case 1:
                    bgColorContainer.style.backgroundColor = "var(--strawberry-multiply)";
                    break;
                case 2:
                    bgColorContainer.style.backgroundColor = "var(--kiwi-multiply)";
                    break;
                default:
                    bgColorContainer.style.backgroundColor = "var(--orange-multiply)";
                    break;
            }
        }

    }

    function setActiveSlide() {
        
        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        slides[activeSlide].classList.add("active");
    }

    // Función para establecer el fondo de cada slide según el ancho de la pantalla
    function resize() {
        if (window.screen.width > 810) {
            slides[0].style.backgroundImage = "url(./img/orange_b.jpg)";
            slides[1].style.backgroundImage = "url(./img/strawberry_b.jpg)";
            slides[2].style.backgroundImage = "url(./img/lemonKiwi_b.jpg)";
        } else {
            slides[0].style.backgroundImage = "url(./img/orange_mobile.jpg)";
            slides[1].style.backgroundImage = "url(./img/strawberry_mobile.jpg)";
            slides[2].style.backgroundImage = "url(./img/kiwi_mobile.jpg)";
        }
        setBgToBody();
    }

}