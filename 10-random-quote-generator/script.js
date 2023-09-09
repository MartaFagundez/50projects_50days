{
    const colorCodes = ["#94A684", "#96B6C5", "#9E9FA5", "#96B6C5", "#7EAA92", "#85A389", "#537188", "#CBB279", "#D7C0AE", "#967E76", "#5C8984", "#85586F", "#D0B8A8", "#A7727D", "#B97A95", "#698474"];

    const quote = document.getElementById("quote");
    const author = document.getElementById("author");
    const body = document.querySelector("body");
    const btn = document.getElementById("btn");

    btn?.addEventListener("click", generateQuote);

    generateQuote();


    async function generateQuote() {
        const config = {
          headers: {
            Accept: 'application/json',
          },
        }
      
        const res = await fetch('https://dummyjson.com/quotes/random', config)
        const data = await res.json()
        
        quote.innerHTML = data.quote;
        author.innerHTML = data.author;
        body.style.backgroundColor = colorCodes[(Math.floor(Math.random() * colorCodes.length))];

        // Inhabilitar el botón por 3 segundos para evitar que se hagan demasiadas peticiones seguidas a la api
        btn.disabled = true;
        setTimeout(function() {
            btn.disabled = false;
        }, 3000);

      }
      
}