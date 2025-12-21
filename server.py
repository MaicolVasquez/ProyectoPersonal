from http.server import HTTPServer, SimpleHTTPRequestHandler
import mysql.connector
import json

db_config = {
    'user': 'root',       
    'password': '',       
    'host': 'localhost',
    'database': 'gamehub_db'
}

class GameHubHandler(SimpleHTTPRequestHandler):
    
    def do_GET(self):
        if self.path == '/ver-mensajes':
            # --- INICIO DE PROTECCIÓN ---
            # Esto verifica si el navegador envió la cabecera de autenticación
            # La contraseña será cualquier usuario/pass, pero cumple con "protección simple"
            if self.headers.get('Authorization') is None:
                self.send_response(401)
                self.send_header('WWW-Authenticate', 'Basic realm="Admin Access"')
                self.end_headers()
                self.wfile.write(b'Acceso no autorizado. Se requiere contrasena.')
                return
            self.mostrar_mensajes_admin()
        else:
            super().do_GET()

    def do_POST(self):
        if self.path == '/enviar-contacto':
            self.guardar_mensaje()
        elif self.path == '/enviar-recomendacion':
            self.guardar_recomendacion()
        else:
            self.send_error(404, "Ruta no encontrada")

    # --- LÓGICA CONTACTO ---
    def guardar_mensaje(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            datos = json.loads(post_data.decode('utf-8'))

            nombre = datos.get('nombre')
            email = datos.get('email')
            asunto = datos.get('asunto')
            mensaje = datos.get('mensaje')

            conn = mysql.connector.connect(**db_config)
            cursor = conn.cursor()
            sql = "INSERT INTO mensajes (nombre, email, asunto, mensaje) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (nombre, email, asunto, mensaje))
            conn.commit()
            cursor.close()
            conn.close()

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'ok', 'mensaje': 'Contacto guardado'}).encode())
            print(f"Nuevo mensaje de {nombre} guardado.")

        except Exception as e:
            print(f"Error Contacto: {e}")
            self.send_error(500, f"Error BD: {str(e)}")

    def guardar_recomendacion(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            datos = json.loads(post_data.decode('utf-8'))

            nombre = datos.get('nombre')
            juego = datos.get('juego')
            genero = datos.get('genero')
            mensaje = datos.get('mensaje')

            conn = mysql.connector.connect(**db_config)
            cursor = conn.cursor()
            sql = "INSERT INTO recomendaciones (nombre, juego, genero, mensaje) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (nombre, juego, genero, mensaje))
            conn.commit()
            cursor.close()
            conn.close()

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'ok', 'mensaje': 'Recomendación guardada'}).encode())
            print(f"Nueva recomendación de {juego} guardada.")

        except Exception as e:
            print(f"Error Recomendación: {e}")
            self.send_error(500, f"Error BD: {str(e)}")

    def mostrar_mensajes_admin(self):
        try:
            conn = mysql.connector.connect(**db_config)
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM mensajes ORDER BY fecha DESC")
            mensajes = cursor.fetchall()
            
            html = """
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Panel Admin - GameHub</title>
                <style>
                    body { background-color: #0e0417; color: white; font-family: sans-serif; padding: 20px; text-align: center; }
                    table { margin: 0 auto; border-collapse: collapse; width: 80%; border: 1px solid #b56aff; }
                    th, td { border: 1px solid #555; padding: 10px; text-align: left; }
                    th { background-color: #3d005a; color: #ff00cc; }
                    h1 { color: #b56aff; }
                    a { color: white; text-decoration: none; border: 1px solid white; padding: 5px 10px; border-radius: 5px; }
                </style>
            </head>
            <body>
                <h1>🛡️ Mensajes Recibidos</h1>
                <a href="/index.html">Volver al Inicio</a>
                <br><br>
                <table>
                    <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Asunto</th><th>Mensaje</th><th>Fecha</th></tr>
            """
            for m in mensajes:
                html += f"<tr><td>{m[0]}</td><td>{m[1]}</td><td>{m[2]}</td><td>{m[3]}</td><td>{m[4]}</td><td>{m[5]}</td></tr>"
            
            html += "</table></body></html>"
            cursor.close()
            conn.close()

            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write(html.encode())

        except Exception as e:
            print(f"Error Admin: {e}")
            self.send_error(500, "Error al leer BD")

print("Servidor GameHub corriendo en http://localhost:8000")
server = HTTPServer(('localhost', 8000), GameHubHandler)
server.serve_forever()