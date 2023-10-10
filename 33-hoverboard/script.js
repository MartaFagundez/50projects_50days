{
    const board = document.getElementById("board");
    const radios = document.querySelectorAll('input[name="palette"]');
    const palettes = {
        pixelParty: ["#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#3A86FF"],
        pastelNeon: ["#45FFCA", "#FEFFAC", "#FFB6D9", "#D67BFF"],
        natureVibe: ["#618264", "#79AC78", "#B0D9B1", "#C7F2A4", "#609966"]
    }
    let colors = palettes.pixelParty;
    const SQUARES = 500;

    // Setear la paleta por defecto;
    setPalette();

    // Crear los elementos square en el DOM
    for(let i = 0; i < SQUARES; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        board.appendChild(square);
    }

    // Añadir listeners para dispositivos táctiles
    board.addEventListener("touchstart", (e) => {
        if (e.target.classList.contains('square')) {
            e.preventDefault();
            setColor(e.target);
            setTimeout(() => removeColor(e.target), 1000);
        }
    });

    board.addEventListener("touchmove", (e) => {
        e.preventDefault(); // Evita el comportamiento de desplazamiento por defecto
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element.classList.contains('square')) {
            setColor(element);
            setTimeout(() => removeColor(element), 1000);
        }
    });

    // Añadir listeners para dispositivos con mouse
    board.addEventListener("mouseover", (e) => {
        if (e.target.classList.contains('square')) {
            setColor(e.target);
        }
    });

    board.addEventListener("mouseout", (e) => {
        if (e.target.classList.contains('square')) {
            removeColor(e.target);
        }
    });

    // Añadir listener a los radio buttons
    for (const radioButton of radios) {
        radioButton.addEventListener("click", setPalette);
    }


    // ============ FUNCIONES =================== //
    function setColor(element) {
        const color = getRandomColor();
        element.style.background = color;
        element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
    }

    function removeColor(element) {
        element.style.background = "var(--gray-color)";
        element.style.boxShadow = "0 0 2px #000";
    }

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function setPalette() {
        const selectedRadioButton = [...radios].find(radio => radio.checked);
        if (selectedRadioButton) {
            colors = palettes[selectedRadioButton.id];
        }
    }
}
