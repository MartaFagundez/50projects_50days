{
    const toastsContainer = document.getElementById("toastsContainer");
    const btnNormal = document.getElementById("btnNormal");
    const btnSuccess = document.getElementById("btnSuccess");
    const btnError = document.getElementById("btnError");

    const successIcon = "https://lottie.host/9a08e1d9-ee13-4fb9-bfea-57002edf21fe/lD9fcAKzGT.json";
    const errorIcon = "https://lottie.host/5e5b07f8-2d95-4609-9eb8-5779341611d2/CPjX670YU7.json";
    const defaultMsg = "Short informative message";
    const successMsg = "Short success message";
    const errorMsg = "Short error message";

    btnNormal?.addEventListener("click", () => makeToast());
    btnSuccess?.addEventListener("click", () => makeToast("success"));
    btnError?.addEventListener("click", () => makeToast("error"));


    function makeToast(type = "", message = "") {
        let toast = document.createElement('div');
        toast.classList.add("toast");

        if (type === "success") {
            toast.innerHTML = 
            `<div class="icon">
                <dotlottie-player
                    src=${successIcon} 
                    background="transparent"
                    speed="1"
                    style="width: 25px; height: 25px"
                    direction="1"
                    mode="normal"
                    autoplay
                ></dotlottie-player>
            </div>
            <div class="message">
                <p>${message ? message : successMsg}</p>
            </div>`;
        }
        else if (type === "error") {
            toast.innerHTML = 
            `<div class="icon">
                <dotlottie-player
                    src=${errorIcon} 
                    background="transparent"
                    speed="1"
                    style="width: 25px; height: 25px"
                    direction="1"
                    mode="normal"
                    autoplay
                ></dotlottie-player>
            </div>
            <div class="message">
                <p>${message ? message : errorMsg}</p>
            </div>`;
        }
        else {
            toast.innerHTML = 
            `<div class="message">
                <p>${message ? message : defaultMsg}</p>
            </div>`;
        }

        toastsContainer?.appendChild(toast);

        setTimeout(() => toast.remove(), 4000);
        
    }
}