module.exports={

     assets: ['./src/config/fonts'],
     // Firebase isn't used by the app yet (NotificationsService isn't imported and
     // there's no GoogleService-Info.plist), so keep its pods out of the iOS build.
     dependencies: {
       '@react-native-firebase/app': {platforms: {ios: null}},
       '@react-native-firebase/auth': {platforms: {ios: null}},
       '@react-native-firebase/messaging': {platforms: {ios: null}},
     },
}
