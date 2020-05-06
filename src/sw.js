// /* eslint-disable */
// import 'preact-cli/lib/lib/sw.js';
// // self.importScripts('node_modules/preact-cli/lib/lib/sw.js');

// // if (workbox) {
// //   console.log(`Yay! Workbox is loaded 🎉`);
// // } else {
// //   console.log(`Boo! Workbox didn't load 😬`);
// // }

// // workbox.core.skipWaiting();
// // workbox.core.clientsClaim();

// // // START DEDFAULT FUNCTIONALITY

// self.__precacheManifest = [].concat(self.__precacheManifest || []);

// const isNav = (event) => event.request.mode === 'navigate';

// /**
//  * Adding this before `precacheAndRoute` lets us handle all
//  * the navigation requests even if they are in precache.
//  */
// workbox.routing.registerRoute(
//   ({ event }) => isNav(event),
//   new workbox.strategies.NetworkFirst({
//     // this cache is plunged with every new service worker deploy so we dont need to care about purging the cache.
//     cacheName: workbox.core.cacheNames.precache,
//     networkTimeoutSeconds: 5, // if u dont start getting headers within 5 sec fallback to cache.
//     plugins: [
//       new workbox.cacheableResponse.Plugin({
//         statuses: [200], // only cache valid responses, not opaque responses e.g. wifi portal.
//       }),
//     ],
//   })
// );

// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// workbox.routing.setCatchHandler(({ event }) => {
//   if (isNav(event))
//     return caches.match(workbox.precaching.getCacheKeyForURL('/index.html'));
//   return Response.error();
// });

// END DEDFAULT FUNCTIONALITY

// STARTE Firebase
// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.

// importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js');
// // Initialize the Firebase app in the service worker by passing in the
// // messagingSenderId.
// firebase.initializeApp({
//   apiKey: 'AIzaSyBhUdUbAfkxCcNSqP14LE4uwQ2Bo9TNqRk',
//   authDomain: 'challengemyself-f65a8.firebaseapp.com',
//   databaseURL: 'https://challengemyself-f65a8.firebaseio.com',
//   projectId: 'challengemyself-f65a8',
//   storageBucket: 'challengemyself-f65a8.appspot.com',
//   messagingSenderId: '905777837799',
//   appId: '1:905777837799:web:8af8c94b236c7974821442',
//   measurementId: 'G-GWQ066XZVK',
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = firebase.messaging();

// // [END initialize_firebase_in_sw]

// // If you would like to customize notifications that are received in the
// // background (Web app is closed or not in browser focus) then you should
// // implement this optional method.
// // [START background_handler]
// messaging.setBackgroundMessageHandler(function (payload) {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = 'Challenge Reminder';
//   const notificationOptions = {
//     body: payload.data.status,
//     icon: '/firebase-logo.png',
//   };

//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   );
// });

// END FIREBASE

// const version = 'Challengemyself-SW 1';
// // let isOnline = true;
// // let isLoggedIn = true;

// const main = async () => {
//   console.log(`Service Worker ${version} is starting ...`);
//   await sendMessage({ requestStatusUpdate: true });
// };

// const sendMessage = async (msg) => {
//   console.log('SEND');
//   const allClients = await clients.matchAll({
//     includeUncontrolled: true,
//   });
//   console.log(allClients);
//   return Promise.all(
//     allClients.map((client) => {
//       const chan = new MessageChannel();
//       chan.port1.onmessage = onMessage;
//       return client.postMessage(msg, [chan.port2]);
//     })
//   );
// };

// const onMessage = ({ data }) => {
//   debugger;
//   if (data.statusUpdate) {
//     console.log(`SW status is ${JSON.stringify(data.statusUpdate)}`);
//   }
// };

// const onInstall = async (evt) => {
//   console.log(`Service Worker ${version} installed.`);
//   self.skipWaiting();
// };
// const onActivate = async (evt) => {
//   evt.waitUntil(handleActivation());
// };

// const handleActivation = async () => {
//   await clients.claim();

//   console.log(`Service Worker ${version} activated.`);
// };

// main().catch(console.error);

// self.addEventListener('install', onInstall);
// self.addEventListener('activate', onActivate);
// self.addEventListener('message', onMessage);
