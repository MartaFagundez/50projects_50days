{
    const APIURL = "https://api.github.com/users/";

    const main = document.querySelector("main");
    const form = document.getElementById("form");
    const search = document.getElementById("search");

    const player = document.getElementById("player");


    // ================ Player ===================== //
    player.addEventListener("ready", () => {
        setTimeout(() => player.stop(), 1000);
    });


    // ================ Getting data ===================== //
    async function getUser(username) {
        try {
            const { data } = await axios(APIURL + username);
            console.log(data);
            createUserCard(data);
            getRepos(username);
        } catch(err) {
            console.log(err);
            if(err.response.status == 404) {
                createErrorCard("No profile with this username");
            }
        }
    }
    
    async function getRepos(username) {
        try {
            const { data } = await axios(APIURL + username + "/repos?sort=created");
            
            if (data.length > 0) {
                addReposToCard(data);
            }
            else {
                addNoRepoMsg();
            }
        } catch(err) {
            createErrorCard("Problem fetching repos");
        }
    }
    

    // ============== Creating Card =================== //
    function createUserCard(user) {
        console.log(user);
        const userID = user.name || user.login;
        const userBio = user.bio ? `<p>${user.bio}</p>` : "";
        const cardEl = document.createElement("div");
        cardEl.classList.add("flexRowCenter");
        const cardHTML = `
        <!-- Card -->
        <div class="card flexColumnCenter" id="card">
            <div class="firstRow flexColumnCenter">
                <!-- Card Image -->
                <figure class="flexRowCenter">
                    <img src="${user.avatar_url}" alt="${user.name}" />
                </figure>

                <!-- Card Info -->
                <div class="cardInfo flexColumnCenter">
                    <!-- Username -->
                    <h2>
                    <a href=${user.html_url} target="_blank"
                        >${userID}</a
                    >
                    </h2>

                    <!-- User Bio -->
                    ${userBio}

                    <!-- Stats -->
                    <div class="stats flexRowCenter">
                    <p><span>${user.followers}</span> followers</p>
                    <p><span>${user.following}</span> following</p>
                    <p><span>${user.public_repos}</span> public repositories</p>
                    </div>
                </div>
            </div>

            <!-- Latest Repos -->
            <div class="repos flexColumnCenter" id="repos">
                <h4>Latest Repositories</h4>
                <div class="flexRowCenter" id="reposContainer"></div>
            </div>
        </div>`;

        cardEl.innerHTML = cardHTML;

        if(main?.lastElementChild?.firstElementChild?.getAttribute("id") === "card") {
            main.removeChild(main.lastElementChild);
        }

        player.play();
        setTimeout(() => {
            player.stop();
        }, 1000);
        main?.appendChild(cardEl);
    }
    
    function createErrorCard(msg) {
        const cardEl = document.createElement("div");
        cardEl.classList.add("flexRowCenter");
        const cardHTML = `
        <!-- Card -->
        <div class="card flexColumnCenter" id="card">
            <div class="errorMsg">
                <p>${msg}</p>
            </div>
        </div>`;
    
        cardEl.innerHTML = cardHTML;

        if(main?.lastElementChild?.firstElementChild?.getAttribute("id") === "card") {
            main.removeChild(main.lastElementChild);
        }

        player.play();
        setTimeout(() => {
            player.stop();
        }, 1000);
        main?.appendChild(cardEl);
    }
    
    function addReposToCard(repos) {
        const reposEl = document.getElementById("reposContainer");
    
        repos
            .slice(0, 5)
            .forEach(repo => {
                const repoEl = document.createElement("a");
                repoEl.classList.add("repo");
                repoEl.href = repo.html_url;
                repoEl.target = "_blank";
                repoEl.innerText = repo.name;
    
                reposEl.appendChild(repoEl);
            })
    }

    function addNoRepoMsg() {
        const repos = document.getElementById("repos");
        const msgEl = document.createElement("p");
        msgEl.classList.add("noRepoMsg");
        msgEl.innerText = "The user has no public repositories";
        repos?.appendChild(msgEl);
    }
    

    // ============== Form Listener =================== //
    form.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const user = search.value;
    
        if(user) {
            getUser(user);
    
            search.value = "";
        }
    })

}