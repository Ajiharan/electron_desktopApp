import firebase from 'firebase';

let firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyDOOzwTrFGNWxZ3KVD5S8nynJFzlF0viW0",
    authDomain: "desktop-application-46c8f.firebaseapp.com",
    databaseURL: "https://desktop-application-46c8f.firebaseio.com",
    projectId: "desktop-application-46c8f",
    storageBucket: "desktop-application-46c8f.appspot.com",
    messagingSenderId: "642396041439",
    appId: "1:642396041439:web:f7ba6f3b41500a83ee796a",
    measurementId: "G-MQ8GHS9CY8"
  });

  const db=firebaseConfig.firestore();

  export {db};
 
