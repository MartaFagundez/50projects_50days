{
    const panel = document.getElementById("panel");
    const options = document.querySelectorAll(".option");
    const icons = document.querySelectorAll(".option img");
    const sendButton = document.getElementById("sendButton");

    if (sendButton) {
        sendButton.disabled = true;
    }

    let selectedOption = "";
    

    // ========= Gestión de las opciones ========= //
    options.forEach(option => {
        const optionIcon = option.querySelector("img");
        let optionValue = option.querySelector("p")?.innerText;
        if (!(optionValue === "Satisfied" || optionValue === "Neutral" || optionValue === "Unhappy")) {
           optionValue = "";
        }

        option.addEventListener("click", () => {
            if(selectedOption === "" && sendButton) {
                sendButton.disabled = false;
            }
            selectedOption = optionValue || selectedOption;

            if (optionIcon) {
                displayAllImagesInBlue();
                displayImageInColor(optionIcon);
            }
        });

        option.addEventListener("mouseenter", () => {
            if (optionValue !== selectedOption) {
                displayImageInColor(optionIcon);
            }
        });

        option.addEventListener("mouseleave", () => {
            if (optionValue !== selectedOption) {
                displayImageInBlue(optionIcon);
            }
        });
        
    });


    // ========= Gestión del botón ========= //
    sendButton?.addEventListener("click", () => {
        if (panel) {
            panel.innerHTML = `
            <i class="fas fa-heart"></i>
            <strong>Thank You!</strong>
            <br>
            <strong class="feedback">Feedback: ${selectedOption}</strong>
            <p class="finalMessage">We'll use your feedback to improve our customer support</p>
            `
        }
    });


    // ============== FUNCIONES ============== //
    function displayImageInColor(image) {
        if (image.src.includes("icon_blue")) {
            image.src = image.src.replace("icon_blue", "icon");
        }
    }

    function displayImageInBlue(image) {
        if (!image.src.includes("icon_blue")) {
            image.src = image.src.replace("icon", "icon_blue");
        }
    }

    function displayAllImagesInBlue() {
        icons.forEach(icon => displayImageInBlue(icon));
    }
}