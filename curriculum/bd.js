npm init -y
    npm install express mongodb body-parser cors
    ```

* **Creación del archivo `server.js`:**
    * Crea un archivo llamado `server.js` en tu directorio de proyecto y copia el siguiente código:

```javascript
    const express = require('express');
    const bodyParser = require('body-parser');
    const { MongoClient } = require('mongodb');
    const cors = require('cors');

    const app = express();
    const port = 3000;

    app.use(cors()); //permite conexiones desde diferentes origenes.
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    const uri = 'tu_cadena_de_conexion_mongodb'; // Reemplaza con tu cadena de conexión

    async function main() {
      const client = new MongoClient(uri);

      try {
        await client.connect();
        console.log('Conectado a MongoDB');

        const database = client.db('tu_base_de_datos'); // Reemplaza con el nombre de tu base de datos
        const contactos = database.collection('contactos');

        app.post('/contactos', async (req, res) => {
          try {
            const resultado = await contactos.insertOne(req.body);
            res.send('Datos guardados correctamente');
          } catch (error) {
            console.error('Error al guardar los datos:', error);
            res.status(500).send('Error al guardar los datos');
          }
        });

        app.get('/contactos', async (req, res) => {
            try{
                const todosLosContactos = await contactos.find().toArray();
                res.json(todosLosContactos);
            }catch(error){
                console.error("Error al obtener los contactos:", error);
                res.status(500).send("Error al obtener los contactos");
            }
        });

        app.listen(port, () => {
          console.log(`Servidor escuchando en el puerto ${port}`);
        });
      } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
      }
    }

    main();
    ```

* **Reemplaza `'tu_cadena_de_conexion_mongodb'`** con tu cadena de conexión real y `'tu_base_de_datos'` con el nombre de tu base de datos.
* El código agregado es la parte del get, que permite obtener los contactos de la base de datos.

**3. Modificación del frontend (tu HTML):**

* **Modificación del JavaScript:**
    * Cambia el JavaScript en tu archivo HTML para enviar los datos del formulario al backend usando `fetch` o `axios`. Aquí hay un ejemplo usando `fetch`:

```javascript
    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const telefono = document.getElementById("telefono").value;
        const mensaje = document.getElementById("mensaje").value;

        fetch('http://localhost:3000/contactos', { // Ajusta la URL si es necesario
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, correo, telefono, mensaje }),
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Muestra un mensaje de éxito
            // Limpia los campos del formulario
            document.getElementById("nombre").value = "";
            document.getElementById("correo").value = "";
            document.getElementById("telefono").value = "";
            document.getElementById("mensaje").value = "";
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al guardar los datos.');
        });
    });
    ```
* Agregar un botón, y una función para poder ver los datos directamente en la pagina web.

```javascript
    function verContactos(){
        fetch('http://localhost:3000/contactos')
            .then(response => response.json())
            .then(contactos => {
                let listaContactos = "<ul>";
                contactos.forEach(contacto => {
                    listaContactos += `<li>Nombre: ${contacto.nombre}, Correo: ${contacto.correo}, Telefono: ${contacto.telefono}, Mensaje: ${contacto.mensaje}</li>`;
                });
                listaContactos += "</ul>";
                document.getElementById("lista-contactos").innerHTML = listaContactos;
            })
            .catch(error => console.error("Error:", error));
    }