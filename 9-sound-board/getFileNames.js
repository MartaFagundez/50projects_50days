{
    // Sólo para usar en desarrollo

    // Para obtener la base de los nombres de archivo
    const fs = require('fs');
    const filesNames = fs.readdirSync('9-sound-board/imgs').map(file => file.substring(0, file.length - 4));
    //console.log(filesNames);

    // Para crear las etiquetas de audio
    const wavFiles = ["28_european_robin", "36_northern_cardinal", "47_rose_ringed_parakeet"];

    const soundTags = filesNames.map(fileName => {
        let soundFile;

        if (fileName in wavFiles) {
            soundFile = fileName + ".wav";
        } 
        else {
            soundFile = fileName + ".mp3";
        }

        const soundTag = `<audio id="${fileName}" src="sounds/${soundFile}"></audio>`;
        return soundTag;
    });

    console.log(soundTags);

}