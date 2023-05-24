import * as React from 'react';
import Home from '../screens/Home';
import Notas from '../screens/Notas';
import MisCarreras from '../screens/MisCarreras';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, Image,View,Button} from 'react-native';  
import NotasConsulta from '../screens/NotasConsulta';

const tabList = {
    Home : require('../img/icons/home-outline.png'),
    Notas : require('../img/icons/book-settings-outline.png'),
    Carreras : require('../img/icons/account-school.png'),
    User : require('../img/icons/account.png')
  }

const Tab = createBottomTabNavigator();


export default function BottonTab({esProfe, id}) {
  return (
    <Tab.Navigator
    initialRouteName={'Home'}
    
    screenOptions={({ route }) => ({
      headerShown: false, 
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let rn = route.name;
        let iconTint = '#9d9d9e';

        if (rn === 'Home') {
          iconName = focused ? 'abacus' : 'md-wallet';
          iconTint = focused ? '#418ad9' : '#9d9d9e';

        } else if (rn === 'Notas') {
          iconName = focused ? 'access-point' : 'md-wallet';
          iconTint = focused ? '#418ad9' : '#9d9d9e';

        } else if (rn === 'Carreras') {
          iconName = focused ? 'abacus' : 'md-wallet';
          iconTint = focused ? '#418ad9' : '#9d9d9e';
        }else if (rn === 'User') {
          iconName = focused ? 'abacus' : 'md-wallet';
          iconTint = focused ? '#418ad9' : '#9d9d9e';
        }

        // You can return any component that you like here! MaterialCommunityIcons Icon Ionicons
        return  <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image source={tabList[rn] }
                    
                    resizeMode='contain'
                    style= {{
                        width:30,
                        height:30,
                        tintColor:iconTint}}
                />
            </View>
      },
    })}
    >

        <Tab.Screen name="Home" options={{ tabBarLabel: 'Home' }}>
              { 
              () => (<Home esProfe={esProfe} id={id} />)
              }
        </Tab.Screen>

        <Tab.Screen name="Notas" options={{ tabBarLabel: 'Notas' }}>
              {() => (esProfe ? <Notas idProfe={id} /> : <NotasConsulta />)}
        </Tab.Screen>

        <Tab.Screen name="Carreras" component={MisCarreras} options={{
          tabBarLabel: 'Carreras', 
        }}/>

        <Tab.Screen name="User" component={MisCarreras} options={{
          tabBarLabel: 'User', 
        }}/>
    </Tab.Navigator>
  );
}