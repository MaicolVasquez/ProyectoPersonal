document.getElementById('formContacto').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue

    // 1. Capturamos los valores
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value.trim();
    
    // Referencias a elementos de error y botón
    const errorText = document.getElementById('errorMsg');
    const btn = document.querySelector('.btn-enviar');

    // Limpiamos errores previos
    errorText.style.display = 'none';
    errorText.textContent = '';

    try {
        // 2. Validaciones simples
        if (nombre === "") throw new Error("⚠️ Por favor, dinos tu nombre o nickname.");
        if (email === "" || !email.includes('@')) throw new Error("⚠️ Necesitamos un correo válido para responderte.");
        if (asunto === "") throw new Error("⚠️ Selecciona el motivo de tu mensaje.");
        if (mensaje.length < 10) throw new Error("⚠️ El mensaje es muy corto. ¡Cuéntanos más!");

        // 3. Simulación de éxito
        // Cambiamos el texto del botón temporalmente
        const textoOriginal = btn.textContent;
        btn.textContent = "Enviando...";
        btn.style.background = "linear-gradient(90deg, #00ff88, #00cc6a)"; // Verde éxito

        setTimeout(() => {
            alert(`¡Gracias ${nombre}! Hemos recibido tu mensaje sobre "${asunto}". Te responderemos a ${email} pronto.`);
            
            // Resetear formulario y botón
            document.getElementById('formContacto').reset();
            btn.textContent = textoOriginal;
            btn.style.background = ""; // Vuelve al color original
        }, 1500);

    } catch (e) {
        // 4. Mostrar errores
        errorText.textContent = e.message;
        errorText.style.display = 'block';
        
        // Efecto visual de error en el botón
        btn.style.backgroundColor = '#ff4d4d'; // Rojo
        setTimeout(() => {
             btn.style.backgroundColor = '';
        }, 300);
    }
});