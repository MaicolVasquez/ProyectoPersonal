# GameHub - Proyecto de Aplicación Web Personal

Este proyecto es una aplicación web interactiva desarrollada como trabajo final del curso de Desarrollo Web. Integra un Frontend moderno (HTML, CSS, JS), un Backend en Python puro y una Base de Datos MySQL para gestionar la interacción con el usuario.

## Descripción del Proyecto
GameHub es un portal dedicado a videojuegos que permite visualizar mi catálogo personal, consultar un Top 5 mundial en tiempo real y enviar mensajes o recomendaciones que se almacenan en la base de datos.

### Tecnologías Utilizadas
* **Frontend:** HTML5, CSS3 (Diseño responsivo y animaciones), JavaScript (Fetch API, DOM Manipulation).
* **Backend:** Python 3 (`http.server` y `mysql.connector`).
* **Base de Datos:** MySQL.
* **API Externa:** RAWG Video Games Database API.

## Requisitos de Instalación

Para ejecutar este proyecto localmente, necesitas:
1.  Python 3.x instalado.
2.  Servidor MySQL (XAMPP, WAMP o MySQL Workbench).
3.  Conexión a Internet (para la API de juegos).

## Guía de Puesta en Marcha

Sigue estos pasos en orden para configurar el entorno:

### 1. Configuración de la Base de Datos
1.  Abre tu gestor de MySQL (ej. phpMyAdmin o Workbench).
2.  Crea la base de datos importando el archivo incluido: `database.sql`.
    * Esto generará la DB `gamehub_db` y las tablas necesarias.
3.  **Verifica la conexión:** Abre el archivo `server.py` y revisa la variable `db_config`. Por defecto está configurada para usuario `root` sin contraseña:
    ```python
    db_config = {
        'user': 'root',
        'password': '',
        'host': 'localhost',
        'database': 'gamehub_db'
    }
    ```

### 2. Instalación de Librerías Python
Abre la terminal en la carpeta del proyecto e instala el conector de base de datos:
```bash
pip install mysql-connector-python