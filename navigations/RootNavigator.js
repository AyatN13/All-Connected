// RootNavigator.js
import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  return (
    <DrawerContentScrollView>
      <DrawerItem 
        label="🏠 Home" 
        onPress={() => {
          navigation.navigate('MainTabs', { screen: 'Home' });
          navigation.closeDrawer();
        }} 
      />
      <DrawerItem 
        label="🌍 Cities" 
        onPress={() => {
          navigation.navigate('MainTabs', { screen: 'Cities' });
          navigation.closeDrawer();
        }} 
      />
      <DrawerItem 
        label="➕ Create" 
        onPress={() => {
          navigation.navigate('MainTabs', { screen: 'Create' });
          navigation.closeDrawer();
        }} 
      />
      <DrawerItem 
        label="🌳 Profile" 
        onPress={() => {
          navigation.navigate('MainTabs', { screen: 'Profile' });
          navigation.closeDrawer();
        }} 
      />
    </DrawerContentScrollView>
  );
}

export default function RootNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: '80%',
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="MainTabs" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}
