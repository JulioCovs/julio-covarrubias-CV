
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi CV</title>
    <link rel="stylesheet" href="styles.css">
        <style>
        body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #6a0dad, #ff0000);
    color: white;
    text-align: center;
    padding: 20px;
    transition: background 0.5s;
}
.container {
    max-width: 600px;
    margin: auto;
    background: rgba(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    transition: transform 0.3s ease-in-out;
}
.container:hover {
    transform: scale(1.05);
}
button {
    background: #ff0000;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.3s;
}
button:hover {
    background: #6a0dad;
}

textarea {
    width: 100%;  /* Hace que ocupe todo el ancho disponible */
    height: 150px; /* Ajusta la altura según lo necesites */
    padding: 8px;
    font-size: 16px;
}
        </style>
</head>

<body>
    <style>
    color: white;
    </style>
    <div class="container">
        <h1>Bienvenido a mi CV</h1>
        <p>Hola, soy Julio Covarrubias, un desarrollador web apasionado.</p>
        <p>Experiencia: +3 años en desarrollo frontend. <br>
            Hace 6 meses empece en el desarrollo backend y actualmente me encuentro en desarrollo
                react, node.js, y ciberseguridad.
        </p>
        <p>Habilidades: HTML, CSS, JavaScript, React, Node.js</p>
        <button onclick="mostrarAlerta()">¡Haz clic para saber más!</button>
    </div>

    <div class="container">
        <h2>Contacto</h2>
        <form>
            <table>
                <tr>
                    <td><label for="nombre">Nombre:</label></td>
                    <td><input type="text" id="nombre" name="nombre" placeholder="Introducir nombre y apellido"></td>
                </tr>
                <tr>
                    <td><label for="correo">Correo Electrónico:</label></td>
                    <td><input type="email" id="correo" name="correo" placeholder="Introducir correo"></td>
                </tr>
                <tr>
                    <td><label for="telefono">Número de Celular:</label></td>
                    <td><input type="tel" id="telefono" name="telefono" placeholder="Introducir número"></td>
                </tr>
                <tr>
                    <td><label for="mensaje">Descripción:</label></td>
                    <td><textarea id="mensaje" name="mensaje" placeholder="Encantado de ayudarte" cols="50" rows="6"></textarea></td>
                </tr>
                <tr>
                    <td colspan="2"><button type="submit">Enviar</button></td>
                </tr>
            </table>
        </form>
    </div>

    <script>
        document.querySelector("form").addEventListener("submit", function(event) {
            event.preventDefault();
    
            // Obtener los datos del formulario
            let nombre = document.getElementById("nombre").value;
            let correo = document.getElementById("correo").value;
            let telefono = document.getElementById("telefono").value;
            let mensaje = document.getElementById("mensaje").value;
    
            // Crear el XML
            let xmlData = `<?xml version="1.0" encoding="UTF-8"?>
    <contactos>
        <contacto>
            <nombre>${nombre}</nombre>
            <correo>${correo}</correo>
            <telefono>${telefono}</telefono>
            <mensaje>${mensaje}</mensaje>
        </contacto>
    </contactos>`;
    
            // Crear un Blob para descargar el archivo XML
            let blob = new Blob([xmlData], { type: "application/xml" });
            let a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "contactos.xml";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Limpiar los campos del formulario
            document.getElementById("nombre").value = "";
            document.getElementById("correo").value = "";
            document.getElementById("telefono").value = "";
            document.getElementById("mensaje").value = "";

    
            alert("Datos guardados en XML.");
        });
    </script>    

    <script>
        function mostrarAlerta() {
            alert("¡Gracias por visitar mi CV! Si te interesa, contáctame.");
        }
    </script>
</body>

<footer>
    <p>© <span id="year"></span> Julio Covarrubias. Todos los derechos reservados.</p>
</footer>

<script>
    document.getElementById("year").textContent = new Date().getFullYear();
</script>

</html>