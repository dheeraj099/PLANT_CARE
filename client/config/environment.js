
var environments = {
    staging: {
      FIREBASE_API_KEY: 'AIzaSyA5zWLTKyfmTPWFEulxKJqVauvTu8d0Lkc',
      FIREBASE_AUTH_DOMAIN: 'plants2-9e872.firebaseapp.com',
      FIREBASE_DATABASE_URL: 'https://plants2-9e872-default-rtdb.firebaseio.com',
      FIREBASE_PROJECT_ID: 'plants2-9e872',
      FIREBASE_STORAGE_BUCKET: 'plants2-9e872.appspot.com',
      FIREBASE_MESSAGING_SENDER_ID: '120573340126',
      GOOGLE_CLOUD_VISION_API_KEY: 'AIzaSyAlnSgPkfm6nHkvOmdqqTI3pewUf36yFyg'
    },
    production: {
      // Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
    }
  };
  
  function getReleaseChannel() {
    let releaseChannel = Expo.Constants.manifest.releaseChannel;
    if (releaseChannel === undefined) {
      return 'staging';
    } else if (releaseChannel === 'staging') {
      return 'staging';
    } else {
      return 'staging';
    }
  }
  function getEnvironment(env) {
    console.log('Release Channel: ', getReleaseChannel());
    return environments[env];
  }
  var Environment = getEnvironment(getReleaseChannel());
  export default Environment;