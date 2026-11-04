import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigation from './src/navigation/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import ForceUpdateGate from './src/components/ForceUpdateGate';

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigation />
        <ForceUpdateGate />
      </GestureHandlerRootView>
    </Provider>
  );
}
