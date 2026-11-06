import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import MainActivity from './screens/MainActivity';

export type Dish = {
  id: string;
  name: string;
  description: string;
  course: 'Starter' | 'Main' | 'Dessert';
  price: string;
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [dishes, setDishes] = useState<Dish[]>([
    { id: '1', name: 'Bruschetta', description: 'Tomato, basil, halloumi', course: 'Starter', price: '89' },
    { id: '2', name: 'Mushroom Arancini', description: 'Truffle mayo', course: 'Starter', price: '95' },
    { id: '3', name: 'Seared Steak Bites', description: 'Chimichurri, fries', course: 'Main', price: '189' },
    { id: '4', name: 'Grilled Sea Bass', description: 'Lemon, herbs', course: 'Main', price: '175' },
    { id: '5', name: 'Tiramisu Cup', description: 'Coffee, mascarpone', course: 'Dessert', price: '69' },
    { id: '6', name: 'Chocolate Lava Cake', description: 'Vanilla ice cream', course: 'Dessert', price: '72' },
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen">
          {(props) => <SplashScreen {...props} dishes={dishes} setDishes={setDishes} />}
        </Stack.Screen>
        <Stack.Screen name="MainActivity">
          {(props) => <MainActivity {...props} setDishes={setDishes} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}