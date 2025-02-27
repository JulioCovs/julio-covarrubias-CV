npm install mongodb
    ```

* **Código de conexión:**
    * En tu archivo `server.js`, agrega el siguiente código para conectarte a MongoDB:

```javascript
    const { MongoClient } = require('mongodb');

    const uri = 'tu_cadena_de_conexion_mongodb'; // Reemplaza con tu cadena de conexión
    const client = new MongoClient(uri);

    async function main() {
      try {
        await client.connect();
        console.log('Conectado a MongoDB');
        // Aquí puedes realizar operaciones con la base de datos
      } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
      } finally {
        await client.close();
      }
    }

    main();
    ```

* **Reemplaza `'tu_cadena_de_conexion_mongodb'`** con tu cadena de conexión real.

**4. Operaciones básicas con MongoDB:**

* **Creación de una base de datos y una colección:**
    * MongoDB crea automáticamente una base de datos y una colección cuando insertas el primer documento.
    * En tu código Node.js, puedes especificar el nombre de la base de datos y la colección al realizar operaciones:

```javascript
    const database = client.db('tu_base_de_datos');
    const contactos = database.collection('contactos');
    ```

* **Inserción de documentos:**

```javascript
    const resultado = await contactos.insertOne({ nombre: 'Julio', correo: 'julio@ejemplo.com' });
    ```

* **Consulta de documentos:**

```javascript
    const documentos = await contactos.find().toArray();
    console.log(documentos);
    ```

**Recomendaciones adicionales:**

* Familiarízate con la documentación oficial de MongoDB: [mongodb.com/docs/](https://www.mongodb.com/docs/).
* Considera utilizar un ORM (Object-Relational Mapping) como Mongoose para facilitar la interacción con MongoDB desde Node.js.
* Para poder utilizar de manera correcta la base de datos, es muy importante la cadena de conexión.

Espero que esto te ayude a empezar con MongoDB. Si tienes alguna pregunta, no dudes en consultarme.