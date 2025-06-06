let isAudioPlaying = false;
const audioToggle = document.getElementById('audioToggle');
const audio = document.getElementById('pokemonTheme');

// Imposta il volume iniziale
audio.volume = 0.5;

// Riproduci la musica quando la pagina si carica
document.addEventListener('DOMContentLoaded', () => {
    audio.play().then(() => {
        isAudioPlaying = true;
        audioToggle.textContent = '🔊 Disattiva Musica';
        audioToggle.style.backgroundColor = '#ffd700';
    }).catch(error => {
        console.log('La riproduzione automatica è stata bloccata dal browser');
    });
});

function toggleAudio() {
    try {
        if (isAudioPlaying) {
            audio.pause();
            audioToggle.textContent = '🔈 Attiva Musica';
            audioToggle.style.backgroundColor = '#ffcb05';
        } else {
            audio.play();
            audioToggle.textContent = '🔊 Disattiva Musica';
            audioToggle.style.backgroundColor = '#ffd700';
        }
        isAudioPlaying = !isAudioPlaying;
    } catch (error) {
        console.error('Errore con l\'audio:', error);
        alert('Si è verificato un errore con l\'audio. Prova a ricaricare la pagina.');
    }
}

// Aggiungi stile al pulsante audio
audioToggle.style.padding = '1rem 2rem';
audioToggle.style.marginTop = '2rem';
audioToggle.style.borderRadius = '10px';
audioToggle.style.border = 'none';
audioToggle.style.cursor = 'pointer';
audioToggle.style.fontFamily = "'Press Start 2P', cursive";
audioToggle.style.backgroundColor = '#ffcb05';
audioToggle.style.color = '#3c5aa6';
audioToggle.style.transition = 'all 0.3s ease';

// fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
//       .then(response => response.json())
//       .then(data => console.log(data.id))
//       .catch(error => console.error(error));

async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Pokémon non trovato!");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");

        // Aggiungi animazione di fade-in
        imgElement.style.opacity = "0";
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";
        
        // Forza il reflow
        imgElement.offsetHeight;
        
        // Aggiungi la classe per l'animazione
        imgElement.style.opacity = "1";
        imgElement.style.transition = "opacity 0.5s ease-in-out";

        // Riproduci un effetto sonoro quando appare il Pokémon
        if (isAudioPlaying) {
            const catchSound = new Audio('https://www.soundjay.com/button/button-09.mp3');
            catchSound.volume = 0.3;
            catchSound.play().catch(error => console.log('Errore nella riproduzione del suono:', error));
        }
    }
    catch (error) {
        alert("Pokémon non trovato! Prova con un altro nome.");
        console.error(error);
    }
}

// Aggiungi la possibilità di cercare premendo Invio
document.getElementById("pokemonName").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        fetchData();
    }
});