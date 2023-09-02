{
    const books = document.querySelectorAll(".book");
    const quote = document.querySelector(".quote");

    centerQuote();

    window.addEventListener("scroll", checkBooks);

    checkBooks();

    function checkBooks() {
        const triggerBottom = window.innerHeight / 5 * 4;

        books.forEach(book => {
            const bookTop = book.getBoundingClientRect().top;

            if (bookTop < triggerBottom) {
                book.classList.add("show");
            }
            else {
                book.classList.remove("show");
            }
        });

    }

    function centerQuote() {
        const quoteHeight = quote.getBoundingClientRect().bottom - quote.getBoundingClientRect().top;

        const quoteMargin = (window.innerHeight - quoteHeight) / 2;

        quote.style.margin = "quoteMargin auto";
    }
}