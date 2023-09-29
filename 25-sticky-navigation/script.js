{
    const header = document.querySelector("header");
    let lastScrollTop = window.scrollY || document.documentElement.scrollTop;

    // Márgenes para evitar que la animación para mobile
    // se active ante pequeños movimientos accidentales.
    const errorMarginInUp = 7; 
    const errorMarginInDown = 5;

    window.addEventListener("scroll", fixNav);


    function fixNav() {

        shrinkHeader();

        //============= Sólo para smartphones y tablets ===============//
        // El header se oculta al hacer scroll hacia abajo...
        // y reaparece al hacer scroll hacia arriba.
        if (window.innerWidth < 1280) {
            if (window.scrollY > (this.lastScrollTop || 0) + errorMarginInDown) { 
                // console.log('scrolling down');
                header?.classList.add("hidden");
              } else if (window.scrollY < this.lastScrollTop - errorMarginInUp || window.scrollY === 0) {
                // console.log('scrolling up');
                header?.classList.remove("hidden");
              }
            
              this.lastScrollTop = window.scrollY;
        }
    }


    function shrinkHeader() {
        if(window.scrollY > header.offsetHeight + 150) {
            header.classList.add("active");
        } else {
            header.classList.remove("active");
        }
    }
      
}