{
    const cards = document.querySelector(".cards");
    const cardsPerPage = 12;
    let offset = 0;
    let currentPage = 1;
    const pokemonMaxId = 156;
    const btnFirst = document.getElementById("btnFirst");
    const btnPrev = document.getElementById("btnPrev");
    const btnNext = document.getElementById("btnNext");
    const btnLast = document.getElementById("btnLast");
    const paginationText = document.getElementById("paginationText");

    if (btnFirst) {
        btnFirst.disabled = true;
    }
    if (btnPrev) {
        btnPrev.disabled = true;
    }
    

    // =================== Gestión del Paginado ===================== //
    btnFirst?.addEventListener("click", () => {
        offset = 0;
        currentPage = 1;

        if(btnLast) {
            btnLast.disabled = false;
        }
        if(btnNext) {
            btnNext.disabled = false;
        }

        btnFirst.disabled = true;
        if (btnPrev) {
            btnPrev.disabled = true;
        }

        fetchPokemons(offset, cardsPerPage, currentPage);
    });

    btnPrev?.addEventListener("click", () => {
        offset = offset - cardsPerPage;
        currentPage = currentPage - 1;

        if(btnLast) {
            btnLast.disabled = false;
        }
        if(btnNext) {
            btnNext.disabled = false;
        }

        if (currentPage === 1) {
            btnPrev.disabled = true;
            if (btnFirst) {
                btnFirst.disabled = true;
            }
        }

        fetchPokemons(offset, cardsPerPage, currentPage);
    });

    btnNext?.addEventListener("click", () => {
        offset = offset + cardsPerPage;
        currentPage = currentPage + 1;

        if(btnFirst) {
            btnFirst.disabled = false;
        }
        if(btnPrev) {
            btnPrev.disabled = false;
        }

        if (currentPage === Math.ceil(pokemonMaxId / cardsPerPage)) {
            btnNext.disabled = true;
            if (btnLast) {
                btnLast.disabled = true;
            }
        }

        fetchPokemons(offset, cardsPerPage, currentPage);
    });

    btnLast?.addEventListener("click", () => {
        currentPage = Math.ceil(pokemonMaxId / cardsPerPage);
        offset = (currentPage - 1) * cardsPerPage;
        console.log(currentPage);
        console.log(offset);

        if(btnFirst) {
            btnFirst.disabled = false;
        }
        if(btnPrev) {
            btnPrev.disabled = false;
        }

        btnLast.disabled = true;
        if (btnNext) {
            btnNext.disabled = true;
        }

        fetchPokemons(offset, cardsPerPage, currentPage);
    });


    // =================== Gestión de las tarjetas ===================== //
    const fetchPokemons = async (offset, cardsPerPage, currentPage) => {
        // Borrar las cards anteriores
        if (cards) {
            cards.innerHTML = "";
        }

        if (paginationText) {
            paginationText.innerHTML = `Page ${currentPage} of ${Math.ceil(pokemonMaxId/cardsPerPage)}`;
        }

        // Generar las nuevas cards
        for(let i = offset + 1; i <= cardsPerPage * currentPage; i++) {
            await getPokemon(i);
        }
    }

    const getPokemon = async (id) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        createPokemonCard(data);
    }

    const createPokemonCard = (pokemon) => {
        const pokemonEl = document.createElement("div");
        pokemonEl.classList.add("card");

        const idStr = pokemon.id.toString().padStart(3, "0");

        const type = pokemon.types[0].type.name;

        const pokemonInnerHTML = `
        <div class="card_container ${type}">
            <div class="imageContainer">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"
                alt=${pokemon.name} loading="lazy"
              />
            </div>

            <div class="infoContainer">
              <h2 class="id">#${idStr}</h2>
              <h2 class="name">${pokemon.name}</h2>
            </div>

            <div class="typesContainer">
              <div class="typeDisplay">
                <div class="typeName">
                  <p>Type</p>
                  <h3>${type}</h3>
                </div>
                <div class="typeIcon">
                  <img src="imgs/icons/${type}Icon.png" alt=${type} />
                </div>
              </div>
            </div>
        </div>
        `

        pokemonEl.innerHTML = pokemonInnerHTML;

        cards?.appendChild(pokemonEl);
    }

    fetchPokemons(offset, cardsPerPage, currentPage);

}