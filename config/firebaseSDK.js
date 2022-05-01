import firebase from "firebase";

class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: "AIzaSyB5TfDPlNcI2ekUU6GFPSmEp_sQvIA3iTg",
        authDomain: "ask-away-945c8.firebaseapp.com",
        projectId: "ask-away-945c8",
        databaseURL: "https://askaway-945c8.firebaseio.com",
        storageBucket: "ask-away-945c8.appspot.com",
        messagingSenderId: "1074412981750",
        appId: "1:1074412981750:web:2adfddbfd6f91d2a434bd7"
      });
    }
  }
  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  };
  
  createAccount = async (user,success_callback, failed_callback) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(
        function() {
          var userf = firebase.auth().currentUser;
          userf.updateProfile({ displayName: user.name }).then(
            function() {
              success_callback();
            },
            function(error) {
              console.log("Error update displayName.");
            }
          );
        },
        (error) => failed_callback(error)
      );
  };

  uploadProfileImg = async (uri,success_callback) => {
    var userf = firebase.auth().currentUser;
    userf.updateProfile({ photoURL: uri}).then(
      function() {
        console.log("Updated profile img" + uri);
      },
      function(error) {
        console.log("Error update profile img");
      }
    );
  };

  updateUserDetails = async (user,success_callback) => {
    let userf = firebase.auth().currentUser;
    let error = false;
    userf.updateProfile({ displayName:user.name}).then(() => {
        if (user.email !== firebase.auth().currentUser.email){
          const userCred  = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, user.oldpassword);
          firebase.auth().currentUser.reauthenticateWithCredential(userCred)
            .then(() => {
              // User successfully reauthenticated.
              return firebase.auth().currentUser.updateEmail(user.email);
            })
            .catch(error => {
              error = true;
              alert("Email error: " + error);
          });
        }
      
        if (user.newpassword !== ""){
          // update password
          const emailCred  = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, user.oldpassword);
          firebase.auth().currentUser.reauthenticateWithCredential(emailCred)
            .then(() => {
              // User successfully reauthenticated.
              return firebase.auth().currentUser.updatePassword(user.newpassword);
            })
            .catch(error => {
              error = true;
              alert("Please enter correct current password: " + error);
            });
        }
       if (!error){
         success_callback();
       }
      },
      function(error) {
        console.log("Error update user details");
      }
    );
  };

  uploadImage = async uri => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase
        .storage()
        .ref("avatar")
        .child(uuid.v4());
      const task = ref.put(blob);
  
      return new Promise((resolve, reject) => {
        task.on(
          "state_changed",
          () => {
  
          },
          reject,
          () => resolve(task.snapshot.downloadURL)
        );
      });
    } catch (err) {
      console.log("uploadImage try/catch error: " + err.message);
    }
  };
  
  updateAvatar = url => {
  
    var userf = firebase.auth().currentUser;
    if (userf != null) {
      userf.updateProfile({ avatar: url }).then(
        function() {
          console.log("Updated avatar successfully. url:" + url);
          alert("Avatar image is saved successfully.");
        },
        function(error) {
          console.log("Error update avatar.");
          alert("Error update avatar. Error:" + error.message);
        }
      );
    } else {
      console.log("can't update avatar, user is not login.");
      alert("Unable to update avatar. You must login first.");
    }
  };
}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;
