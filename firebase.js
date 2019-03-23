import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyC1HXHLGtlsZ_JXu2cWb_w1spivlGylqoI",
    authDomain: "cityslate-f6544.firebaseapp.com",
    databaseURL: "https://cityslate-f6544.firebaseio.com",
    projectId: "cityslate-f6544",
    storageBucket: "cityslate-f6544.appspot.com",
    messagingSenderId: "426723584032"
  };
firebase.initializeApp(config);
export default firebase;