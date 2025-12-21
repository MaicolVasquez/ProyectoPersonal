const container = document.getElementById('top5-container');

// URL de imagen por defecto (solo si todo falla, un fondo de gaming neutro)
const imagenPorDefecto = "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop";

// LISTA DEFINITIVA TOP 5 MUNDIAL (Imágenes "Antibalas")
// Usamos img.youtube.com porque son servidores rápidos, HD y nunca bloquean las imágenes.
const juegosTop = [
    {
        id: 1,
        name: "Minecraft",
        // Imagen del Trailer Oficial (El paisaje clásico y bonito)
        background_image: "https://img.youtube.com/vi/MmB9b5njVbA/maxresdefault.jpg", 
        rating: "4.9",
        genres: "Sandbox / Aventura",
        released: "2011"
    },
    {
        id: 2,
        name: "Grand Theft Auto V",
        // Imagen del Trailer de Lanzamiento (Michael, Trevor y Franklin)
        background_image: "https://img.youtube.com/vi/QkkoHAzjnUs/maxresdefault.jpg",
        rating: "4.8",
        genres: "Acción / Mundo Abierto",
        released: "2013"
    },
    {
        id: 3,
        name: "Fortnite",
        // Imagen de la última temporada (Capítulo 5 - Wrecked)
        background_image: "https://img.youtube.com/vi/dCBCDAmpJk8/maxresdefault.jpg",
        rating: "4.7",
        genres: "Battle Royale",
        released: "2017"
    },
    {
        id: 4,
        name: "Roblox",
        // Imagen del Cinemático 2021 (Muestra variedad de avatares)
        background_image: "https://img.youtube.com/vi/_EPelwsaF9E/maxresdefault.jpg",
        rating: "4.5",
        genres: "Plataforma Social",
        released: "2006"
    },
    {
        id: 5,
        name: "Free Fire MAX",
        // Imagen promocional de personajes
        background_image: "https://img.youtube.com/vi/ncj3uHk5r6k/maxresdefault.jpg",
        rating: "4.6",
        genres: "Shooter / Battle Royale",
        released: "2017"
    }
];

function cargarTop5() {
    container.innerHTML = ''; // Limpiamos cualquier mensaje de carga

    juegosTop.forEach((juego, index) => {
        const posicion = index + 1;
        
        // Asignamos medallas
        let claseMedalla = '';
        if (posicion === 1) claseMedalla = 'gold';
        else if (posicion === 2) claseMedalla = 'silver';
        else if (posicion === 3) claseMedalla = 'bronze';

        const tarjetaHTML = `
            <div class="top-card">
                <div class="img-container">
                    <div class="rank-circle ${claseMedalla}">#${posicion}</div>
                    <img src="${juego.background_image}" 
                         alt="${juego.name}" 
                         class="top-img"
                         onerror="this.src='${imagenPorDefecto}';">
                </div>
                <div class="content-container">
                    <div class="info-top">
                        <h3>${juego.name}</h3>
                        <div class="meta-tags">
                            <span class="genre-pill">${juego.genres}</span>
                            <span class="rating">⭐ ${juego.rating}/5</span>
                        </div>
                        <p class="desc">Uno de los títulos más jugados e influyentes a nivel global. Lanzado originalmente en: ${juego.released}.</p>
                    </div>
                    <button class="btn-more" onclick="verDetalles('${juego.name}')">Ver Más</button>
                </div>
            </div>
        `;

        container.innerHTML += tarjetaHTML;
    });
}

function verDetalles(nombreJuego) {
    // Abre una búsqueda en Google del juego
    window.open(`https://www.google.com/search?q=${nombreJuego} videojuego oficial`, '_blank');
}

// Ejecutar directamente
cargarTop5();