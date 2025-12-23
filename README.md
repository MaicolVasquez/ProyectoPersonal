# GameHub - Proyecto de Aplicación Web Personal

Este proyecto es una aplicación web interactiva desarrollada como trabajo final del curso de Desarrollo Web. Integra un Frontend moderno, un Backend en Python puro y una Base de Datos MySQL.

## Descripción del Proyecto
GameHub es un portal dedicado a videojuegos que permite visualizar mi catálogo personal, consultar un Top 5 mundial en tiempo real y enviar mensajes o recomendaciones que se almacenan en la base de datos.

## Tecnologías Utilizadas
- **Frontend:** HTML5, CSS3 (diseño responsivo y animaciones), JavaScript (Fetch API y manipulación del DOM).
- **Backend:** Python 3 (`http.server`, `mysql.connector`).
- **Base de Datos:** MySQL.
- **API Externa:** RAWG Video Games Database API.

## Requisitos de Instalación
Para ejecutar este proyecto localmente, necesitas:
1. Python 3.x instalado.
2. Servidor MySQL (XAMPP, WAMP o MySQL Workbench).
3. Conexión a Internet (para la API de juegos).

## Guía de Puesta en Marcha

### 1. Configuración de la Base de Datos
1. Abre tu gestor de MySQL (phpMyAdmin o MySQL Workbench).
2. Importa el archivo `database.sql` incluido en el proyecto.
3. Esto generará la base de datos `gamehub_db` y las tablas necesarias.
4. Abre el archivo `server.py` y verifica la configuración de conexión:

``python``
db_config = {
    'user': 'root',
    'password': '',  # Coloca tu contraseña de MySQL si tienes una
    'host': 'localhost',
    'database': 'gamehub_db'
}
### 2. Instalación de Librerías Python
Desde la carpeta raíz del proyecto, ejecuta en tu terminal:

Bash

pip install mysql-connector-python
### 3. Configuración de la API (Top 5)
1. Abre el archivo scripts/top5-api.js.
2. Busca la línea: const apiKey = 'TU_CLAVE_AQUI';
3. Reemplaza el valor por tu API Key válida de RAWG.io.

**Ejecución del Proyecto**
-Abre la terminal en la carpeta raíz del proyecto.
-Ejecuta el servidor: `python server.py`

Verás el mensaje: Servidor GameHub corriendo en http://localhost:8000
Abre tu navegador y accede a: http://localhost:8000

## Estructura y Funcionalidades
-**Inicio (index.html):** Página principal con diseño tipo Hero y barra de navegación.
-**Mis Juegos (misjuegos.html):** Catálogo personal con tarjetas interactivas y efectos hover.
-**Top 5 (top5.html):** Muestra los 5 videojuegos más populares usando la API de RAWG.
-**Recomendaciones (recomendaciones.html):** Formulario validado con JavaScript que guarda sugerencias en la base de datos.
-**Contacto (contacto.html):** Formulario funcional conectado al backend en Python.

## Panel de Administración (Seguridad)
-El proyecto incluye una ruta protegida para visualizar los mensajes recibidos.
-Ruta: http://localhost:8000/ver-mensajes
-Acceso: El navegador solicitará credenciales.
-Autenticación: Basic Auth con fines demostrativos (puedes ingresar cualquier usuario y contraseña para acceder).

### Autor
Maicol Vasquez

📧 Email: mvasquezvil@unsa.edu.pe

💻 GitHub: /MaicolVasquez
