import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import CitySelectorScreen from '../screens/CitySelectorScreen';
import CityPostsScreen from '../screens/CityPostsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: 'All Connected',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ marginLeft: 15 }}>
            <Ionicons name="menu" size={24} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', marginRight: 15 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Ionicons name="search" size={24} style={{ marginRight: 15 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Profile' })}>
              <Ionicons name="leaf" size={24} />
            </TouchableOpacity>
          </View>
        ),
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cities" component={CitySelectorScreen} />
      <Tab.Screen name="Create" component={CreatePostScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function BottomTabNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Search" 
        component={SearchScreen}
        options={{
          headerShown: true,
          headerTitle: 'Search Posts',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen 
        name="CityPosts" 
        component={CityPostsScreen}
        options={({ route }) => ({
          headerShown: true,
          headerTitle: `Posts from ${route.params.city}`,
          headerBackTitle: 'Back',
          tabBarStyle: { display: 'none' },
        })}
      />
    </Stack.Navigator>
  );
}
