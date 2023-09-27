{
    // ===================== MODAL =====================
    const modalContainer = document.getElementById("modalContainer");
    const openBtn = document.getElementById("openBtn");
    const closeBtn = document.getElementById("closeBtn");

    openBtn?.addEventListener("click", () => {
        if (!modalContainer?.classList.contains("expanding")) {
            modalContainer?.classList.add("expanding");
        }
        if (modalContainer?.classList.contains("out")) {
            modalContainer?.classList.remove("out");
        }
    });

    closeBtn?.addEventListener("click", () => {
        modalContainer?.classList.add("out");
    });


    // ================== DRAWING APP ====================
    const body = document.querySelector("body");
    const canvas = document.getElementById("canvas");
    const penSizeInput = document.getElementById("penSize");
    const penColorInput = document.getElementById("penColor");
    const bgColorInput = document.getElementById("bgColor");
    const clearBtn = document.getElementById("clearBtn");

    const ctx = canvas.getContext('2d');
    
    penSizeInput.value = 20;
    let penSize = penSizeInput.value;
    penColorInput.value = "#e66465";
    let penColor = penColorInput.value;
    bgColorInput.value = "#f8f8f8";
    canvas.style.backgroundColor = bgColorInput.value;

    let isPressed = false;
    let initialPosition = null;
    let x;
    let y;

    setCanvasSize();
    window.onresize = () => setCanvasSize(); // Para detectar los cambios de tamaño de la pantalla y ajustar el tamaño del canvas


    // ============== For mobile devices ================
    canvas.addEventListener('touchstart', (e) => {
        isPressed = true;
        
        const touch = e.touches[0];
        initialPosition = { x: touch.clientX, y: touch.clientY};
        
        x = initialPosition.x;
        y = initialPosition.y;
        drawCircle(x, y);
    });
    
    document.addEventListener('touchend', (e) => {
        isPressed = false;
    
        x = undefined;
        y = undefined;
    });
    
    canvas.addEventListener('touchmove', (e) => {
        if(isPressed) {
            e.preventDefault();

            const touch = e.touches[0];
            const newPosition = { x: touch.clientX, y: touch.clientY};
            const x2 = newPosition.x;
            const y2 = newPosition.y;
    
            drawCircle(x2, y2);
            drawLine(x, y, x2, y2);
    
            x = x2;
            y = y2;
        }
    });


    // ============== For desktop devices ================
    canvas.addEventListener('mousedown', (e) => {
        isPressed = true;
    
        x = e.offsetX;
        y = e.offsetY;
    });
    
    document.addEventListener('mouseup', (e) => {
        isPressed = false;
    
        x = undefined;
        y = undefined;
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if(isPressed) {
            const x2 = e.offsetX;
            const y2 = e.offsetY;
    
            drawCircle(x2, y2);
            drawLine(x, y, x2, y2);
    
            x = x2;
            y = y2;
        }
    });
    // ===================================================

    penSizeInput.addEventListener("input", (event) => {
        penSize = event.target.value;
    });

    penColorInput.addEventListener("change", (e) => penColor = e.target.value);

    bgColorInput?.addEventListener("change", (e) => canvas.style.backgroundColor = e.target.value);
    
    clearBtn.addEventListener('click', () => {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        bgColorInput.value = "#f8f8f8";
        canvas.style.backgroundColor = bgColorInput.value;
    });


    
    function drawCircle(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, penSize, 0, Math.PI * 2);
        ctx.fillStyle = penColor;
        ctx.fill();
    }
    
    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = penColor;
        ctx.lineWidth = penSize * 2;
        ctx.stroke();
    }

    // Definir las medidas del canvas según en relación al tamaño del viewport
    function setCanvasSize() {
        let containerWidth = window.innerWidth - (parseFloat(window.getComputedStyle(body).paddingLeft) * 2);
        let containerHeight = window.innerHeight - (parseFloat(window.getComputedStyle(body).paddingTop) * 2);

        canvas.width = containerWidth;

        if (window.innerWidth < 810) {
            canvas.height = containerHeight * 0.77;
        }
        else {
            canvas.height = containerHeight * 0.87;
        }

    }

}