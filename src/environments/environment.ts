// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyB9P5u7jeoTduNue5REvxG2GFlJldFCUOI',
    //authDomain: '<your-project-authdomain>',
    databaseURL: 'https://pizzeria-1533a.firebaseio.com/',
    projectId: 'pizzeria-1533a'//,
    //storageBucket: '<your-storage-bucket>',
    //messagingSenderId: '<your-messaging-sender-id>'
  }
};
