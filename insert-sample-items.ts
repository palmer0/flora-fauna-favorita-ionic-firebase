import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Inicializar Firebase Admin con las credenciales por defecto
initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();

type Item = {
  nombre: string;
  descripcion: string;
  tipo: 'animal' | 'planta';
  imagenUrl: string;
  vecesElegido: number;
  fechaCreacion: number;
};

// Aquí defines manualmente las URLs de las imágenes subidas a Firebase Storage
const items: Item[] = [
  // Animales
  {
    nombre: 'Zorro',
    descripcion: 'Animal ágil y astuto que vive en bosques y campos.',
    tipo: 'animal',
    imagenUrl: 'https://your-storage-url/animal_1.jpg',
    vecesElegido: 12,
    fechaCreacion: Date.now(),
  },
  {
    nombre: 'Ciervo',
    descripcion: 'Mamífero herbívoro que habita en zonas boscosas.',
    tipo: 'animal',
    imagenUrl: 'https://your-storage-url/animal_2.jpg',
    vecesElegido: 28,
    fechaCreacion: Date.now(),
  },
  {
    nombre: 'Lobo',
    descripcion: 'Depredador social que vive en manadas.',
    tipo: 'animal',
    imagenUrl: 'https://your-storage-url/animal_3.jpg',
    vecesElegido: 40,
    fechaCreacion: Date.now(),
  },
  {
    nombre: 'Águila',
    descripcion: 'Ave rapaz de gran visión y vuelo poderoso.',
    tipo: 'animal',
    imagenUrl: 'https://your-storage-url/animal_4.jpg',
    vecesElegido: 21,
    fechaCreacion: Date.now(),
  },
  {
    nombre: 'Oso',
    descripcion: 'Animal fuerte y grande que hiberna en invierno.',
    tipo: 'animal',
    imagenUrl: 'https://your-storage-url/animal_5.jpg',
    vecesElegido: 33,
    fechaCreacion: Date.now(),
  },

  // Plantas
  {
    nombre: 'Roble',
    descripcion: 'Árbol fuerte y longevo, símbolo de resistencia.',
    tipo: 'planta',
    imagenUrl: 'https://your-storage-url/planta_1.jpg',
    vecesElegido: 18,
    fechaCreacion: Date.now(),
  },
  {
    nombre: 'Helecho',
    descripcion: 'Planta sin flores que crece en zonas húmedas.',
    tipo: 'planta',
    imagenUrl: 'https://your-storage-url/planta_2.jpg',
    vecesElegido: 8,
    fechaCreacion: Date.now(),
  },
  {
    nombre: 'Lavanda',
    descripcion: 'Planta aromática usada en perfumes y aceites.',
    tipo: 'planta',
    imagenUrl: 'https://your-storage-url/planta_3.jpg',
    vecesElegido: 23,
    fechaCreacion: Date.now(),
  },
  {
    nombre: 'Cactus',
    descripcion: 'Planta adaptada a climas secos con espinas.',
    tipo: 'planta',
    imagenUrl: 'https://your-storage-url/planta_4.jpg',
    vecesElegido: 14,
    fechaCreacion: Date.now(),
  },
  {
    nombre: 'Bambú',
    descripcion: 'Planta de rápido crecimiento muy resistente.',
    tipo: 'planta',
    imagenUrl: 'https://your-storage-url/planta_5.jpg',
    vecesElegido: 11,
    fechaCreacion: Date.now(),
  },
];

async function insertItems() {
  const itemsRef = db.collection('items');

  for (const item of items) {
    await itemsRef.add(item);
    console.log(`✔️ Añadido: ${item.nombre}`);
  }

  console.log('✅ Todos los ítems fueron insertados en Firestore.');
}

insertItems().catch((error) => console.error('❌ Error insertando ítems:', error));
