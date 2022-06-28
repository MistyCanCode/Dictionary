
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const search = document.getElementById("search");
search.addEventListener("click", getFetch)

function getFetch(){
    let inputWord = document.getElementById("inputWord").value;
    console.log(inputWord)
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                    <h3>${inputWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>${data[0].phonetic}</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
                //console.log(data[0].phonetics[0].audio)
                console.log(data[0].phonetics[1].audio)
                //sound.setAttribute('crossorigin', 'anonymous')
                sound.crossOrigin = 'anonymous'
                //sound.src = `${data[0].phonetics[1].audio}`
            sound.setAttribute("src", `${data[0].phonetics[1].audio}`);
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
}
function playSound() {
    var playPromise = document.querySelector('audio').play();
    if(playPromise !== undefined){
        playPromise.then(function() {
            //Automatic playback started!
        }).catch(function(){
            //Automatic playback failed
            result.innerHTML += `<h4 class="error">Couldn't Find The Sound Clip</h4>`
        })
    }
    //sound.play();
}