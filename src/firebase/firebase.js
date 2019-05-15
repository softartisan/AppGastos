import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export {
  firebase,
  database as default
}

// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('value', (snapshot) => {
//   const expenses = []
//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });
//   console.log(expenses);
// });


// database.ref('expenses').push({
//   description: 'qqqqqqqqq',
//   note: 'wwwwwww',
//   amount: 0,
//   createdAt: 1
// });

// database.ref('notes/-Lep5QhhviS6KhDoo-Kv').update({
//   body: 'terminar el curso'
// });



// database.ref().on('value', (snapshot) => {
//   const val = snapshot.val();
//   console.log('pco');
// });

// database.ref()
//   .once('value')
//   .then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// database.ref('isSingle').remove().then(() => {
//   console.log('isSingle Removed');
// }).catch((e) => {
//   console.log(e);
// });

// database.ref().set({
//   name: 'Sebastian Canio',
//   age: 23,
//   stressLevel: 6,
//   job: {
//     title: 'Software Developer',
//     company: 'Google'
//   },
//   location:{
//     city: 'Santiago',
//     country: 'Chile'
//   }
// }).then(() => {
//   console.log('Data is saved');
// }).catch((e) => {
//   console.log(e);
// });

// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Seattle'
// });

// // database.ref().set('This is my data');

// database.ref('location/country').set('Rusia');

// database.ref('attributes').set({
//   height: 50,
//   weight: 69
// }).then(() => {
//   console.log('Data saved.')
// }).catch((e) => {
//   console.log(e);
// });