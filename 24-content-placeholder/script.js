{
    const header = document.getElementById("header");
    const title = document.getElementById("title");
    const excerpt = document.getElementById("excerpt");
    const profile_img = document.getElementById("profile_img");
    const name = document.getElementById("name");
    const date = document.getElementById("date");
    const headerText = document.getElementById("headerText");
    const footerText = document.getElementById("footerText");

    const animated_bgs = document.querySelectorAll(".animated-bg");
    const animated_bgs_darker = document.querySelectorAll(".animated-bg-darker");
    const animated_bg_texts = document.querySelectorAll(".animated-bg-text");
    const animated_bg_titles = document.querySelectorAll(".animated-bg-title");

    setTimeout(getData, 2500);

    function getData() {
    header.innerHTML = `<img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80" alt="" />`;
    title.innerHTML = "Lorem ipsum dolor sit amet";
    excerpt.innerHTML = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore perferendis";
    profile_img.innerHTML = `<img src="https://randomuser.me/api/portraits/men/45.jpg" alt="" />`;
    name.innerHTML = "John Doe";
    date.innerHTML = "Sep 28, 2023";
    headerText.innerHTML = "Content Placeholder";
    footerText.innerHTML = `Made with <i class="fa-solid fa-heart"></i> by
                            <a href="https://www.linkedin.com/in/martafagundezrodriguez" target="_blank">
                            Marta Fagúndez
                            </a>`

    animated_bgs.forEach((bg) => bg.classList.remove("animated-bg"));
    animated_bgs_darker.forEach((bg) => bg.classList.remove("animated-bg-darker"));
    animated_bg_texts.forEach((bg) => bg.classList.remove("animated-bg-text"));
    animated_bg_titles.forEach((bg) => bg.classList.remove("animated-bg-title"));
    }
}