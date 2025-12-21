document.getElementById('formRecomendacion').addEventListener('submit', function(event) {
            event.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const juego = document.getElementById('juego').value.trim();
            const genero = document.getElementById('genero').value;
            const mensaje = document.getElementById('mensaje').value.trim();
            const errorText = document.getElementById('errorMsg');

            errorText.style.display = 'none';
            errorText.textContent = '';

            try {
                if (nombre === "") {
                    throw new Error("⚠️ Por favor, ingresa tu nombre.");
                }
                
                if (juego === "") {
                    throw new Error("El nombre del juego es obligatorio.");
                }

                if (genero === "") {
                    throw new Error("Debes seleccionar un género.");
                }

                if (mensaje.length < 10) {
                    throw new Error("Tu recomendación es muy corta (mínimo 10 caracteres).");
                }

                alert(`¡Éxito! Recomendación de "${juego}" enviada correctamente.`);
                document.getElementById('formRecomendacion').reset(); 

            } catch (e) {
                errorText.textContent = e.message;
                errorText.style.display = 'block';
                
                const btn = document.querySelector('.btn-enviar');
                btn.style.backgroundColor = '#ff4d4d';
                setTimeout(() => {
                     btn.style.backgroundColor = '';
                }, 300);
            }
        });