export async function openDB(name, version) {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(name, version);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {

            const db = event.target.result;
            db.createObjectStore('products', { keyPath: 'id' });
        };

    });
}

export async function getFromDB(db, storeName, key) {

    return new Promise((resolve, reject) => {
    
        const transaction = db.transaction([storeName]);
        const store = transaction.objectStore(storeName);
        const request = store.get(key);
    
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    
    });
}

export async function putToDB(db, storeName, data) {
    
    return new Promise((resolve, reject) => {
    
        const transaction = db.transaction([storeName], 'readwrite');
    
        const store = transaction.objectStore(storeName);
        const request = store.put(data);
        request.onsuccess = () => resolve(request.result);
    
        request.onerror = () => reject(request.error);
    
    });
}

