{
    // If the current device is mobile...
    if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)) {
        const msgHtml = `<div class="msg">Access this site from a device with a mouse to see the cursor animations</div>`;
        const msgEl = document.createElement("p");
        msgEl.innerHTML= msgHtml;
        document.querySelector("main")?.appendChild(msgEl);
    } 
    else {
        let cursor = document.createElement("div");
        cursor.classList.add("cursor");
        document.body.appendChild(cursor);
    
        const triggers = document.querySelectorAll(".cursor-scale");
        let mouseX = 0,
            mouseY = 0;
    
        gsap.to({}, 0.016, {
            repeat: -1,
        
            onRepeat: function () {
                gsap.set(cursor, {
                    css: {
                        left: mouseX,
                        top: mouseY
                    }
                })
            }
        });
    
        window.addEventListener("mousemove", function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY
        });
    
        triggers.forEach(trigger => {
            trigger.addEventListener("mouseleave", () => {
                cursor.classList.remove("grow");
                cursor.classList.remove("grow-small");
            });
    
            trigger.addEventListener("mousemove", () => {
                cursor.classList.add("grow");
                if(trigger.classList.contains("small")) {
                    cursor.classList.remove("grow");
                    cursor.classList.add("grow-small");
                }
            });
        });
    }
    
}