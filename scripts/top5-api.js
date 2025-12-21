const container = document.getElementById('top5-container');

// 1. TU CLAVE DE API (Déjala así si usas el respaldo)
const apiKey = 'TU_CLAVE_AQUI'; 

const url = `https://api.rawg.io/api/games?key=${apiKey}&dates=2023-01-01,2024-12-31&ordering=-added&page_size=5`;

// 2. DATOS DE RESPALDO CON IMÁGENES SEGURAS (Steam CDN)
// He cambiado las URLs por las oficiales de Steam que son muy estables.
const juegosRespaldo = [
    {
        id: 3328,
        name: "The Witcher 3: Wild Hunt",
        // Imagen de cabecera de Steam (siempre funciona)
        background_image: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
        rating: 4.8,
        genres: [{ name: "RPG" }],
        released: "2015-05-18"
    },
    {
        id: 3498,
        name: "Grand Theft Auto V",
        background_image: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg",
        rating: 4.5,
        genres: [{ name: "Acción" }],
        released: "2013-09-17"
    },
    {
        id: 4200,
        name: "Portal 2",
        background_image: "https://cdn.cloudflare.steamstatic.com/steam/apps/620/header.jpg",
        rating: 4.6,
        genres: [{ name: "Puzzle" }],
        released: "2011-04-18"
    },
    {
        id: 5286,
        name: "Tomb Raider (2013)",
        background_image: "https://cdn.cloudflare.steamstatic.com/steam/apps/203160/header.jpg",
        rating: 4.0,
        genres: [{ name: "Aventura" }],
        released: "2013-03-05"
    },
    {
        id: 12020,
        name: "Left 4 Dead 2",
        background_image: "https://cdn.cloudflare.steamstatic.com/steam/apps/550/header.jpg",
        rating: 4.1,
        genres: [{ name: "Shooter" }],
        released: "2009-11-17"
    }
];

// URL de una imagen por defecto por si TODO falla (un mando de consola neón)
const imagenPorDefecto = "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1000&auto=format&fit=crop";

async function cargarTop5() {
    container.innerHTML = '<p style="text-align:center; color:white;">Cargando...</p>';

    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error("Error API");
        const datos = await respuesta.json();
        mostrarJuegos(datos.results);
    } catch (error) {
        console.warn('Usando respaldo por error de API.');
        mostrarJuegos(juegosRespaldo);
    }
}

function mostrarJuegos(listaJuegos) {
    container.innerHTML = ''; 

    listaJuegos.forEach((juego, index) => {
        const posicion = index + 1;
        
        let claseMedalla = '';
        if (posicion === 1) claseMedalla = 'gold';
        else if (posicion === 2) claseMedalla = 'silver';
        else if (posicion === 3) claseMedalla = 'bronze';

        const rating = juego.rating ? juego.rating : "N/A";

        // AQUÍ ESTÁ EL TRUCO: añadimos onerror="..." a la imagen
        // Si la imagen falla al cargar, se cambia sola por la 'imagenPorDefecto'
        const tarjetaHTML = `
            <div class="top-card">
                <div class="img-container">
                    <div class="rank-circle ${claseMedalla}">#${posicion}</div>
                    <img src="${juego.background_image}" 
                         alt="${juego.name}" 
                         class="top-img" 
                         onerror="this.onerror=null;this.src='${imagenPorDefecto}';"> 
                </div>
                <div class="content-container">
                    <div class="info-top">
                        <h3>${juego.name}</h3>
                        <div class="meta-tags">
                            <span class="genre-pill">${juego.genres[0]?.name || 'Juego'}</span>
                            <span class="rating">🏆 ${rating}/5</span>
                        </div>
                        <p class="desc">Un título imprescindible que ha marcado tendencia. Lanzado en: ${juego.released}.</p>
                    </div>
                   <button class="btn-more" onclick="verDetalles(${juego.id})">Más Información</button>
                </div>
            </div>
        `;

        container.innerHTML += tarjetaHTML;
    });
}

function verDetalles(id) {
    // Si el ID es menor a 100000 (suele ser manual), buscamos en Google, si no en RAWG
    const urlDestino = id < 999999 ? `https://rawg.io/games/${id}` : `https://www.google.com/search?q=${id}`;
    window.open(`https://rawg.io/games/${id}`, '_blank');
}

cargarTop5();