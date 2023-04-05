import { openDB } from 'idb';

const initdb = async () =>
  openDB('text-editor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('documents')) {
        console.log('text-editor database already exists');
        return;
      }
      db.createObjectStore('documents', { keyPath: 'id', autoIncrement: true });
      console.log('text-editor database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const saveDocument = async (document) => {
  const db = await initdb();
  const tx = db.transaction('documents', 'readwrite');
  const store = tx.objectStore('documents');
  await store.add(document);
  await tx.complete;
};

// Add logic for a method that gets all the content from the database
export const getDocuments = async () => {
  const db = await initdb();
  const tx = db.transaction('documents', 'readonly');
  const store = tx.objectStore('documents');
  return store.getAll();
};

