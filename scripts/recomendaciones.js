document.getElementById('formRecomendacion').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const juego = document.getElementById('juego').value.trim();
    const genero = document.getElementById('genero').value;
    const mensaje = document.getElementById('mensaje').value.trim();
    const errorText = document.getElementById('errorMsg');
    const btn = document.querySelector('.btn-enviar');

    errorText.style.display = 'none';
    errorText.textContent = '';

    try {
        // Validaciones
        if (nombre === "") throw new Error("⚠️ Por favor, ingresa tu nombre.");
        if (juego === "") throw new Error("El nombre del juego es obligatorio.");
        if (genero === "") throw new Error("Debes seleccionar un género.");
        if (mensaje.length < 10) throw new Error("Tu recomendación es muy corta.");

        // Preparar envío
        const textoOriginal = btn.textContent;
        btn.textContent = "Enviando...";
        btn.disabled = true;

        const datos = {
            nombre: nombre,
            juego: juego,
            genero: genero,
            mensaje: mensaje
        };

        // --- AQUÍ ESTÁ EL ENLACE CON PYTHON ---
        fetch('/enviar-recomendacion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        })
        .then(response => {
            if (response.ok) {
                alert(`¡Gracias! Hemos guardado tu recomendación de "${juego}" en la Base de Datos.`);
                document.getElementById('formRecomendacion').reset();
            } else {
                throw new Error("Error en el servidor");
            }
        })
        .catch(error => {
            console.error(error);
            errorText.textContent = "⚠️ Error al conectar con el servidor (¿Está encendido server.py?).";
            errorText.style.display = 'block';
        })
        .finally(() => {
            btn.textContent = textoOriginal;
            btn.disabled = false;
        });

    } catch (e) {
        errorText.textContent = e.message;
        errorText.style.display = 'block';
        btn.style.backgroundColor = '#ff4d4d';
        setTimeout(() => btn.style.backgroundColor = '', 300);
    }
});