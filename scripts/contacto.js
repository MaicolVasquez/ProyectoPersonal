document.getElementById('formContacto').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value.trim();
    const errorText = document.getElementById('errorMsg');
    const btn = document.querySelector('.btn-enviar');

    errorText.style.display = 'none';

    try {
        if (nombre === "") throw new Error("⚠️ Ingresa tu nombre.");
        if (email === "") throw new Error("⚠️ Ingresa tu correo.");
        if (asunto === "") throw new Error("⚠️ Selecciona un asunto.");
        if (mensaje.length < 10) throw new Error("⚠️ Mensaje muy corto.");

        const textoOriginal = btn.textContent;
        btn.textContent = "Enviando...";
        btn.disabled = true;

        const datos = { nombre, email, asunto, mensaje };

        fetch('/enviar-contacto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        })
        .then(res => {
            if (res.ok) {
                alert(`¡Gracias ${nombre}! Mensaje guardado.`);
                document.getElementById('formContacto').reset();
            } else {
                throw new Error("Error del servidor");
            }
        })
        .catch(err => {
            errorText.textContent = "⚠️ Error: No se pudo conectar con el servidor (Python).";
            errorText.style.display = 'block';
        })
        .finally(() => {
            btn.textContent = textoOriginal;
            btn.disabled = false;
        });

    } catch (e) {
        errorText.textContent = e.message;
        errorText.style.display = 'block';
    }
});