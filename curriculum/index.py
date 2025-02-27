from flask import Flask, request
import xml.etree.ElementTree as ET

app = Flask(__name__)

@app.route('/guardar', methods=['POST'])
def guardar():
    nombre = request.form['nombre']
    correo = request.form['correo']
    telefono = request.form['telefono']
    mensaje = request.form['mensaje']

    # Crear estructura XML
    root = ET.Element("contactos")
    contacto = ET.SubElement(root, "contacto")
    ET.SubElement(contacto, "nombre").text = nombre
    ET.SubElement(contacto, "correo").text = correo
    ET.SubElement(contacto, "telefono").text = telefono
    ET.SubElement(contacto, "mensaje").text = mensaje

    # Guardar en archivo XML
    tree = ET.ElementTree(root)
    tree.write("contactos.xml", encoding="utf-8")

    return "Datos guardados en XML"

if __name__ == '__main__':
    app.run(debug=True)


import pandas as pd
import xml.etree.ElementTree as ET

# Leer el XML
tree = ET.parse("contactos.xml")
root = tree.getroot()

# Extraer datos
data = []
for contacto in root.findall("contacto"):
    data.append({
        "Nombre": contacto.find("nombre").text,
        "Correo": contacto.find("correo").text,
        "Teléfono": contacto.find("telefono").text,
        "Mensaje": contacto.find("mensaje").text
    })

# Guardar en Excel
df = pd.DataFrame(data)
df.to_excel("contactos.xlsx", index=False)

print("Datos exportados a Excel")
