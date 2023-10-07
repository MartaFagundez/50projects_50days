{
    const textEl = document.getElementById('text');
    const speedEl = document.getElementById('speed');
    const text = 'Dream Big & Work Hard';
    let idx = 1;

    function updateSpeed() {
        return 500 / speedEl.value;
    }

    function writeText() {
        textEl.innerText = text.slice(0, idx);

        idx++;

        if (idx > text.length) {
            setTimeout(() => {
                idx = 1;
                writeText();
            }, 2000); // Esperamos 2 segundos antes de volver a comenzar
        } else {
            setTimeout(writeText, updateSpeed());
        }
    }

    speedEl.addEventListener('input', () => updateSpeed());

    // Comenzar el efecto de tipeo
    writeText();
}