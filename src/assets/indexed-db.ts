import { Word } from '../models/word';

const dbName = 'word-db';
const dbVersion = 1;
const storeName = 'words';

const getTransaction = async (stores: string) => {
  const db = await connect();
  return db.transaction(stores, 'readwrite') as IDBTransaction;
};
const getStore = async () => {
  const transaction = await getTransaction(storeName);
  return transaction.objectStore(storeName);
};

const connect = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    let db: IDBDatabase;
    const request = indexedDB.open(dbName, dbVersion);
    // NOTE: triggered when a database of a bigger version number than the existing stored database is loaded.
    request.onupgradeneeded = event => {
      db = (event.target as IDBRequest).result as IDBDatabase;
      db.createObjectStore(storeName, {
        keyPath: 'id',
        autoIncrement: true
      });
    };
    request.onsuccess = event => {
      db = (event.target as IDBRequest).result;
      resolve(db);
    };
    request.onerror = () => {
      reject();
    };
  });
};

export const getAll = () => {
  return new Promise<Word[]>(async (resolve, reject) => {
    let words: Word[] = [];
    const req = (await getStore()).openCursor();
    req.onsuccess = event => {
      const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;
      if (cursor) {
        words.push(cursor.value as Word);
        cursor.continue();
      } else {
        resolve(words);
      }
    };
    req.onerror = () => {
      reject(words);
    };
  });
};

export const add = (word: Word) => {
  return new Promise(async (resolve, reject) => {
    const req = (await getStore()).add(word);
    req.onsuccess = () => {
      resolve(word);
    };
    req.onerror = () => {
      reject(word);
    };
  });
};

export const put = (work: any) => {
  return new Promise(async (resolve, reject) => {
    const req = (await getStore()).put(work);
    req.onsuccess = () => {
      resolve(work);
    };
    req.onerror = () => {
      reject(work);
    };
  });
};

export const remove = (targetId: number) => {
  return new Promise(async (resolve, reject) => {
    const req = (await getStore()).delete(targetId);
    req.onsuccess = () => {
      resolve(targetId);
    };
    req.onerror = () => {
      reject(targetId);
    };
  });
};
