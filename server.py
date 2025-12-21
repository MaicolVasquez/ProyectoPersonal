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
            self.mostrar_mensajes_admin()
        else:

            super().do_GET()

    def do_POST(self):
        if self.path == '/enviar-contacto':
            self.guardar_mensaje()
        else:
            self.send_error(404, "Ruta no encontrada")



    def guardar_mensaje(self):

        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        datos = json.loads(post_data.decode('utf-8'))

        nombre = datos.get('nombre')
        email = datos.get('email')
        asunto = datos.get('asunto')
        mensaje = datos.get('mensaje')

        try:

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
            self.wfile.write(json.dumps({'status': 'ok', 'mensaje': 'Guardado en BD'}).encode())
            print(f"Nuevo mensaje de {nombre} guardado.")

        except Exception as e:
            print(f"Error BD: {e}")
            self.send_error(500, "Error al guardar en base de datos")

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
                <link rel="stylesheet" href="estilos/styles.css">
                <style>
                    body { padding: 50px; text-align: center; }
                    table { margin: 0 auto; border-collapse: collapse; width: 80%; background: rgba(30, 10, 45, 0.9); }
                    th, td { border: 1px solid #b56aff; padding: 10px; text-align: left; color: white; }
                    th { background-color: #3d005a; color: #ff00cc; }
                    h1 { color: #ff00cc; }
                </style>
            </head>
            <body>
                <h1>🛡️ Mensajes Recibidos (Admin)</h1>
                <a href="/index.html" style="color: white; margin-bottom: 20px; display:block;">Volver al Inicio</a>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Asunto</th>
                        <th>Mensaje</th>
                        <th>Fecha</th>
                    </tr>
            """
            
            for m in mensajes:
                html += f"""
                    <tr>
                        <td>{m[0]}</td>
                        <td>{m[1]}</td>
                        <td>{m[2]}</td>
                        <td>{m[3]}</td>
                        <td>{m[4]}</td>
                        <td>{m[5]}</td>
                    </tr>
                """
            
            html += "</table></body></html>"
            
            cursor.close()
            conn.close()

            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write(html.encode())

        except Exception as e:
            print(f"Error Admin: {e}")
            self.send_error(500, "Error al leer base de datos")

print("Servidor GameHub corriendo en http://localhost:8000")
server = HTTPServer(('localhost', 8000), GameHubHandler)
server.serve_forever()