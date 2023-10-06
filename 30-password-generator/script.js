{
    //================== DOM ELEMENTS ==================//
    // Result
    const resultContainer = document.getElementById("resultContainer");
    // The Viewbox where the result will be shown
    const resultViewbox = document.getElementById("resultViewbox");
    const copyBtn = document.getElementById("copyBtn");
    // Text info showed after generate button is clicked
    const copyInfo = document.querySelector(".resultInfo.right");
    // Text appear after copy button is clicked
    const copiedInfo = document.querySelector(".resultInfo.left");

    // Slider
    const lengthTitle = document.getElementById("lengthTitle");
    const lengthInput = document.getElementById("length");

    // Checkboxes
    const uppercaseEl = document.getElementById("uppercase");
    const lowercaseEl = document.getElementById("lowercase");
    const numberEl = document.getElementById("number");
    const symbolEl = document.getElementById("symbol");

    const generateBtn = document.getElementById("generateBtn");
    
    
    // If this variable is true only then the copyBtn will appear
    let generatedPassword = false;


    //================== COPY BUTTON ==================//
    // Update Css Props
    let resultContainerBound = {
        left: resultContainer.getBoundingClientRect().left,
        top: resultContainer.getBoundingClientRect().top,
    };
    // Update position based on mouse position
    resultContainer.addEventListener("mousemove", e => {
        resultContainerBound = {
            left: resultContainer.getBoundingClientRect().left,
            top: resultContainer.getBoundingClientRect().top,
        };
        if(generatedPassword){
            copyBtn.style.opacity = '1';
            copyBtn.style.pointerEvents = 'all';
            copyBtn.style.setProperty("--x", `${e.x - resultContainerBound.left}px`);
            copyBtn.style.setProperty("--y", `${e.y - resultContainerBound.top}px`);
        }else{
            copyBtn.style.opacity = '0';
            copyBtn.style.pointerEvents = 'none';
        }
    });

    window.addEventListener("resize", e => {
        resultContainerBound = {
            left: resultContainer.getBoundingClientRect().left,
            top: resultContainer.getBoundingClientRect().top,
        };
    });

    // Copy Password in clipboard
    // With mouse
    copyBtn.addEventListener("click", copyPassword);
    // Without mouse
    resultContainer.addEventListener("touchstart", copyPassword);

    function copyPassword() {
        const password = resultViewbox.innerText;
        if (!password || password == "CLICK GENERATE BUTTON") {
            return;
        }
        navigator.clipboard.writeText(password);

        copyInfo.style.transform = "translateY(200%)";
        copyInfo.style.opacity = "0";
        copiedInfo.style.transform = "translateY(0%)";
        copiedInfo.style.opacity = "0.75";
    }

    
    //=============== SLIDER TITLE NUMBER ===============//
    // Listener to update slider's title number
    lengthInput.addEventListener("input", event => {
        lengthTitle.setAttribute("data-length", event.target.value);
    });


    //================= RANDOM FUNCTIONS =================//
    const randomFunc = {
        lower: getRandomLower,
        upper: getRandomUpper,
        number: getRandomNumber,
        symbol: getRandomSymbol,
    };

    function getRandomLower() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
    function getRandomUpper() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }
    function getRandomNumber() {
        return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }
    function getRandomSymbol() {
        const symbols = '~!@#$%^&*()_+{}":?><;.,';
        return symbols[Math.floor(Math.random() * symbols.length)];
    }


    //=============== GENERATE PASSWORD =================//
    generateBtn.addEventListener("click", () => {
        const length = Number(lengthInput.value);
        const hasLower = lowercaseEl.checked;
        const hasUpper = uppercaseEl.checked;
        const hasNumber = numberEl.checked;
        const hasSymbol = symbolEl.checked;
        generatedPassword = true;
        resultViewbox.innerText = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
        
        copyInfo.style.transform = "translateY(0%)";
        copyInfo.style.opacity = "0.75";
        copiedInfo.style.transform = "translateY(200%)";
        copiedInfo.style.opacity = "0";
    });

    function generatePassword(length, lower, upper, number, symbol) {
        let generatedPassword = "";
        const typesCount = lower + upper + number + symbol;
        const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
        if (typesCount === 0) {
            return "";
        }
        for (let i = 0; i < length; i++) {
            typesArr.forEach(type => {
                const funcName = Object.keys(type)[0];
                generatedPassword += randomFunc[funcName]();
            });
        }
        return generatedPassword.slice(0, length)
                                        .split('').sort(() => Math.random() - 0.5)
                                        .join('');
    }


    //=============== CHECKBOXS MANAGEMENT =================//
    // At least one needs to be selected. The last checked checkbox will be disabled.
    function disableOnlyCheckbox(){
        let totalChecked = [uppercaseEl, lowercaseEl, numberEl, symbolEl].filter(el => el.checked);
        totalChecked.forEach(el => {
            if(totalChecked.length === 1){
                el.disabled = true;
            }else{
                el.disabled = false;
            }
        })
    }

    [uppercaseEl, lowercaseEl, numberEl, symbolEl].forEach(el => {
        el.addEventListener('click', () => {
            disableOnlyCheckbox()
        })
    })
}