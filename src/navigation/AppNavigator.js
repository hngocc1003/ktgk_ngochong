import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import { useMyContextProvider } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AppNavigator = () => {
  const Stack = createNativeStackNavigator()

  const [initialRoute, setInitialRoute] = useState(null);
  const [, dispatch] = useMyContextProvider();

  useEffect(() => {
    const checkUserLogin = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        dispatch({ type: 'USER_LOGIN', value: JSON.parse(userData) });
        setInitialRoute('HomeScreen');
      } else {
        setInitialRoute('LoginScreen');
      }
    };

    checkUserLogin();
  }, [dispatch]);

  if (initialRoute === null) {
    // You can return a loading screen here while checking the user login status
    return null;
  }

  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerShown: true,
          }}
        >   

          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default AppNavigator;