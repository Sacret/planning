import Firebase from 'firebase';

// Setup Firebase
const config = {
  apiKey: 'AIzaSyCogAIcprb9-gZA-y8eGyATqlp9V_WRr2I',
  authDomain: 'planning-7ff43.firebaseapp.com',
  databaseURL: 'https://planning-7ff43.firebaseio.com',
  projectId: 'planning-7ff43',
  storageBucket: 'planning-7ff43.appspot.com',
  messagingSenderId: '396190928003',
};
const firebaseApp = Firebase.initializeApp(config);

const db = firebaseApp.database();
export default db;
