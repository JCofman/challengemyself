/* eslint-disable */
// START DEFAULT FUNCTIONALITY

self.__precacheManifest = [].concat(self.__precacheManifest || []);

const isNav = (event) => event.request.mode === 'navigate';

/**
 * Adding this before `precacheAndRoute` lets us handle all
 * the navigation requests even if they are in precache.
 */
workbox.routing.registerRoute(
  ({ event }) => isNav(event),
  new workbox.strategies.NetworkFirst({
    // this cache is plunged with every new service worker deploy so we dont need to care about purging the cache.
    cacheName: workbox.core.cacheNames.precache,
    networkTimeoutSeconds: 5, // if u dont start getting headers within 5 sec fallback to cache.
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200], // only cache valid responses, not opaque responses e.g. wifi portal.
      }),
    ],
  })
);

workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.setCatchHandler(({ event }) => {
  if (isNav(event))
    return caches.match(workbox.precaching.getCacheKeyForURL('/index.html'));
  return Response.error();
});

// END DEFAULT FUNCTIONALITY

importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js'
);
// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: 'AIzaSyBhUdUbAfkxCcNSqP14LE4uwQ2Bo9TNqRk',
  authDomain: 'challengemyself-f65a8.firebaseapp.com',
  databaseURL: 'https://challengemyself-f65a8.firebaseio.com',
  projectId: 'challengemyself-f65a8',
  storageBucket: 'challengemyself-f65a8.appspot.com',
  messagingSenderId: '905777837799',
  appId: '1:905777837799:web:8af8c94b236c7974821442',
  measurementId: 'G-GWQ066XZVK',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// [END initialize_firebase_in_sw]

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]

messaging.setBackgroundMessageHandler(function (payload) {
  // Customize notification here
  const notificationTitle = payload.data.notification.title;
  const notificationOptions = {
    body: payload.data.status,
    icon: '/assets/icons/android-chrome-192x192.png',
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
