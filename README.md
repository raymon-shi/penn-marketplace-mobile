# project-penn-marketplace-mobile
Penn Marketplace Mobile

note: to get rid of errors involving "export 'ViewPropTypes' was not found
* go to react-native-web folder inside node_modules
* go to dist/index.js
* add in the following line
```
export const ViewPropTypes = { style: null };
```
