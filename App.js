import * as React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Matches from './screens/matches';
import Classification from './screens/classification';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{
          style: {
            justifyContent: 'center',
          },
          tabStyle: {
            backgroundColor: '#fff',
            justifyContent: 'center',
          },
        }}>
          <Tab.Screen name="Partidos" component={Matches} />
          <Tab.Screen name="Clasificación" component={Classification} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
