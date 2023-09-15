{
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
        counter.innerText = "0";

        const updateCounter = () => {
            const target = Number(counter.getAttribute("data-target"));
            let c = Number(counter.innerText);

            const increment = target / 200;

            if (c < target) {
                counter.innerText = `${Math.ceil(c +  increment)}`;
                setTimeout(updateCounter, 1);
            }
            else {
                counter.innerText = target;
            }
        }

        updateCounter();
        
    });
}