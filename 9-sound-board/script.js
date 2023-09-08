{
    const filesNames = ['10_black_winged_stilt',
    '11_blue_jay',
    '12_blue_crowned_trogon',
    '13_collared_trogon',
    '14_canary',
    '15_chestnut_munia',
    '16_white_stork',
    '17_wood_warbler',
    '18_cockatiel',
    '19_common_kingfisher',
    '1_gentoo_penguin',
    '20_common_redstart',
    '21_cotinga_cayana',
    '22_crested_tit',
    '23_crow',
    '24_dendrocopos',
    '25_duck',
    '26_eurasian_bullfinch',
    '27_eurasian_golden_oriole',
    '28_european_robin',
    '29_purple-crowned_fairywren',
    '2_king_penguin',
    '30_splendid_fairywren',
    '31_flamingo',
    '32_kiwi',
    '33_lovebird',
    '34_magpie',
    '35_marsh_tit',
    '36_northern_cardinal',
    '37_northern_lapwing',
    '38_northern_wheatear',
    '39_pelican',
    '3_amadina',
    '40_peregrine_falcon',
    '41_pied_avocet',
    '42_pigeon',
    '43_red_billed_firefinch',
    '44_red_cheeked_cordon_bleu',
    '45_red_flanked_bluetail',
    '46_rook',
    '47_rose_ringed_parakeet',
    '48_shoebill',
    '49_toucan',
    '4_american_goldfinch',
    '50_tufted_titmouse',
    '51_waxwing',
    '52_whinchat',
    '53_wood_warbler',
    '54_honeycreeper',
    '5_ardea',
    '6_atlantic_puffin',
    '7_bay_backed_shrike',
    '9_black_redstart',
    '8_bearded_reedling'];


    filesNames.forEach(filename => {
        // Crear el contenedor para la tarjeta
        const birdCard = document.createElement("div");
        birdCard.classList.add("card");
        // Agregar el contenedor a la sección correpondiente
        const content = document.querySelector(".content");
        content?.appendChild(birdCard);

        // Crear el contenedor para la imagen
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("imgContainer");
        // Agregar el contenedor a la tarjeta correpondiente
        birdCard.appendChild(imgContainer);

        // Crear la imagen y setear sus atributos
        const img = document.createElement("img");
        img.setAttribute("src", `https://martafagundez.com/mini-projects/birds-of-the-world/imgs/${filename}.png`);
        let birdNameArr = filename.split("_");
        birdNameArr.shift();
        // Capitalizar cada palabra del nombre
        birdNameArr = birdNameArr.map(nameWord => nameWord.charAt(0).toUpperCase() + nameWord.slice(1));
        const birdName = birdNameArr.join(" ");
        img.setAttribute("alt", `${birdName}  illustration`);
        // Agregar la imagen al contenedor
        imgContainer.appendChild(img);

        // Crear el texto para la tarjeta y setear sus atributos
        const nameText = document.createElement("p");
        nameText.innerText = birdName;
        birdCard.appendChild(nameText);

        // Vincular cada sonido con cada imagen
        img.addEventListener("click", () => {

            // Detener todo sonido que se esté reproduciendo
            stopSounds();

            // Reproducir el sonido asociado a la imagen
            document.getElementById(filename).play();
        });
    });

    
    function stopSounds() {
        filesNames.forEach(fileName => {
            const sound = document.getElementById(fileName);

            sound.pause();
            sound.currentTime = 0;
        });
    }

}