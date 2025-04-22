const admin = require('firebase-admin');
const { initializeApp: initClient } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');

// clave privada de Firebase Admin
const serviceAccount =
  require('../favoritos-plantas-animales-firebase-adminsdk.json');
const firebaseConfig = {
  projectId: "favoritos-plantas-animales",
  appId: "1:820281706374:web:2b582045a4c1dabae50e07",
  storageBucket: "favoritos-plantas-animales.appspot.com",
  apiKey: "AIzaSyDJKY5qaT1WKT8mJ0XbYTN1QfylkURyLu4",
  authDomain: "favoritos-plantas-animales.firebaseapp.com",
  messagingSenderId: "820281706374"
};

// Inicializar Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: firebaseConfig.storageBucket,
});

// Inicializar cliente Firebase (para usar Storage SDK cliente)
initClient(firebaseConfig);
const storage = getStorage();
const db = getFirestore();

const tipos = ['animal', 'planta'];
const imageDir = './sample-images'; // carpeta donde están las imágenes

async function uploadImage(filePath, nombre) {
  const fileBuffer = fs.readFileSync(filePath);
  const storageRef = ref(storage, `items/${nombre}`);
  await uploadBytes(storageRef, fileBuffer);
  const url = await getDownloadURL(storageRef);
  return url;
}


/*

// === Nuevos Animales ===

{
  nombre: 'Castor',
    descripcion: 'Mamífero semiacuático conocido por construir presas y diques con troncos.',
  tipo: 'animal',
  imagenUrl: 'https://your-storage-url/castor.jpg',
  vecesElegido: Math.floor(Math.random() * 100),
  fechaCreacion: Date.now()
},
{
  nombre: 'Camaleón',
    descripcion: 'Reptil capaz de cambiar de color y mover los ojos de forma independiente.',
  tipo: 'animal',
  imagenUrl: 'https://your-storage-url/camaleon.jpg',
  vecesElegido: Math.floor(Math.random() * 100),
  fechaCreacion: Date.now()
},
*/

/*

// === Nuevas Plantas ===

{
  nombre: 'Menta',
    descripcion: 'Planta aromática utilizada en infusiones y cocina por su frescura.',
  tipo: 'planta',
  imagenUrl: 'https://your-storage-url/menta.jpg',
  vecesElegido: Math.floor(Math.random() * 100),
  fechaCreacion: Date.now()
},
{
  nombre: 'Girasol',
    descripcion: 'Planta con flores grandes y amarillas que giran siguiendo al sol.',
  tipo: 'planta',
  imagenUrl: 'https://your-storage-url/girasol.jpg',
  vecesElegido: Math.floor(Math.random() * 100),
  fechaCreacion: Date.now()
},
*/

async function crearItems() {
  for (const tipo of tipos) {
    for (let i = 1; i <= 5; i++) {

      const nombre = tipo === 'animal'
        ? ['Zorro', 'Ciervo', 'Lobo', 'Águila', 'Oso'][i - 1]
        : ['Roble', 'Helecho', 'Lavanda', 'Cactus', 'Bambú'][i - 1];

      const descripcion = tipo === 'animal'
        ? [
          'Animal ágil y astuto que vive en bosques y campos.',
          'Mamífero herbívoro que habita en zonas boscosas.',
          'Depredador social que vive en manadas.',
          'Ave rapaz de gran visión y vuelo poderoso.',
          'Animal fuerte y grande que hiberna en invierno.',
        ][i - 1]
        : [
          'Árbol fuerte y longevo, símbolo de resistencia.',
          'Planta sin flores que crece en zonas húmedas.',
          'Planta aromática usada en perfumes y aceites.',
          'Planta adaptada a climas secos con espinas.',
          'Planta de rápido crecimiento muy resistente.',
        ][i - 1];

      const filename = `${tipo}_${i}.png`;
      const filePath = path.join(imageDir, filename);
      console.log(`📤 Subiendo imagen: ${filename}`);
      const imagenUrl = await uploadImage(filePath, filename);

      const item = {
        nombre,
        descripcion,
        tipo,
        imagenUrl,
        vecesElegido: Math.floor(Math.random() * 20),
        fechaCreacion: Date.now()
      };

      await db.collection('items').add(item);
      console.log(`✅ Añadido: ${nombre}`);
    }
  }

  console.log('🎉 Todos los ítems fueron insertados correctamente.');
}

crearItems().catch(console.error);
