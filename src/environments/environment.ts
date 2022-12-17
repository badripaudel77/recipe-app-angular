// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  FIREBASE_BASE_URL : 'https://ng-app-e6a4b-default-rtdb.firebaseio.com',
  //FIREBASE_SIGNUP_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]',
  // query params will be appended later in the request
  FIREBASE_SIGNUP_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
  FIREBASE_SIGNIN_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
  FIREBASE_AUTH_API_KEY: 'AIzaSyC2HFOQeQ9eh_-fTZhWk85pxiP0tiDpaL4'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
