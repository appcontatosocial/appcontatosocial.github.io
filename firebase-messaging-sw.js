importScripts("https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.15.5/firebase-messaging.js"
);

//Using singleton breaks instantiating messaging()
// App firebase = FirebaseWeb.instance.app;

firebase.initializeApp({
  apiKey: "AIzaSyAZmwQmKsQzleEA_PAVpzA0vXjy3wFa1tE",
  appId: "1:29372328201:web:c88a02bb217fefe0c68bd8",
  messagingSenderId: "29372328201",
  projectId: "contato-social-137b3",
  authDomain: "contato-social-137b3.firebaseapp.com",
  storageBucket: "contato-social-137b3.appspot.com",
  measurementId: "G-GZ2LZQ91HR",
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("New Message");
    });
  return promiseChain;
});
self.addEventListener("notificationclick", function (event) {
  console.log("notification received: ", event);
});
