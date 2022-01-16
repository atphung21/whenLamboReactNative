import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './Navigation/tabs';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './Stores/rootReducers';

const Stack = createStackNavigator();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initalRouteName={'MainLayout'}
        >
          <Stack.Screen name="MainLayout" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  SafeArea: {
    flex: 1,
  },
});

export default App;
