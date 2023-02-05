import { KeyboardAvoidingView, Platform } from "react-native";
import { Provider } from "react-redux";
import store from "./src/stores/store";
import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";
import EatsScreen from "./src/screens/EatsScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./config/firebase";
import ChatScreen from "./src/screens/ChatScreen";

const Stack = createNativeStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <AuthenticatedUserContext.Provider value={{ user, setUser }}>
            {children}
        </AuthenticatedUserContext.Provider>
    );
};

function MainStack() {
    return (
        <Stack.Navigator defaultScreenOptions={HomeScreen}>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                headerShown={false}
            />
            <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                headerShown={false}
            />
            <Stack.Screen
                name="EatsScreen"
                component={EatsScreen}
                headerShown={false}
            />
            <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
                headerShown={true}
            />
        </Stack.Navigator>
    );
}

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
    );
}

function RootNavigator() {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // onAuthStateChanged returns an unsubscriber
        const unsubscribeAuth = onAuthStateChanged(
            auth,
            async (authenticatedUser) => {
                authenticatedUser ? setUser(authenticatedUser) : setUser(null);
                setIsLoading(false);
            }
        );
        // unsubscribe auth listener on unmount
        return unsubscribeAuth;
    }, [user]);
    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <AuthenticatedUserProvider>
            <SafeAreaProvider>
                <Provider store={store}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{ flex: 1 }}
                        keyboardVerticalOffset={
                            Platform.OS === "ios" ? -64 : 20
                        }
                    >
                        <RootNavigator />
                    </KeyboardAvoidingView>
                </Provider>
            </SafeAreaProvider>
        </AuthenticatedUserProvider>
    );
}

// const Stack = createNativeStackNavigator();
// const AuthenticationUserContext = createContext({});

// const AuthenticationUserProvider = ({children}) => {
//   const [ user, setUser ] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   if (loading) {
//     return (
//       <View className='flex-1 items-center justify-center'>
//         <ActivityIndicator size='large' color='black'/>
//       </View>
//     )
//   }

//   return (
//     <AuthenticationUserContext.Provider value={user}>
//       {children}
//     </AuthenticationUserContext.Provider>
//   )
// }

// const ChatStack = () => {
//   return (
//     <Stack.Navigator defaultScreenOptions={HomeScreen}>
//       <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
//     </Stack.Navigator>
//   )
// }

// const authStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
//       <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown:false}}/>
//     </Stack.Navigator>
//   )
// }

// const mapStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="EatsScreen" component={EatsScreen} options={{headerShown:false}}/>
//     </Stack.Navigator>
//   )
// }

// const RootProvider = () => {
//     const { user, setUser } = useContext(AuthenticationUserContext)
//     const [ loading, setLoading ] = useState(true);
//     useEffect(() => {
//       const unsubscribe = onAuthStateChanged(auth, async AuthenticatedUser =>{
//         AuthenticatedUser? setUser(AuthenticatedUser) : setUser(null)
//         setLoading(false);
//       })
//       return ()=> unsubscribe();
//     }, [user])

//     if (loading) {
//       return (
//         <View className='flex-1 items-center justify-center'>
//           <ActivityIndicator size='large' color='black'/>
//         </View>
//       )
//     }

//     <NavigationContainer>
//       <Provider store={store}>
//         <SafeAreaProvider>
//           <Stack.Navigator>
//             { user ? <ChatStack/> : <authStack/>}
//             {/* <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
//             <Stack.Screen name="MapScreen" component={MapScreen} options={{headerShown:false}}/>
//             <Stack.Screen name="EatsScreen" component={EatsScreen} options={{headerShown:false}}/>
//             <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
//             <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown:false}}/> */}
//           </Stack.Navigator>
//         </SafeAreaProvider>
//       </Provider>
//     </NavigationContainer>
// }

// export default function App (){
//   return (
//     <AuthenticationUserProvider>
//       <RootProvider/>
//     </AuthenticationUserProvider>
//   )
// }

// ########################################################################################

// import React, { useState, createContext, useContext, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { View, ActivityIndicator } from 'react-native';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './config/firebase';
// import Login from './screens/Login';
// import Signup from './screens/Signup';
// import Chat from './screens/Chat';
// import Home from './screens/Home';

// const Stack = createStackNavigator();
// const AuthenticatedUserContext = createContext({});

// const AuthenticatedUserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
// return (
//     <AuthenticatedUserContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthenticatedUserContext.Provider>
//   );
// };

// function ChatStack() {
//   return (
//     <Stack.Navigator defaultScreenOptions={Home}>
//       <Stack.Screen name='Home' component={Home} />
//       <Stack.Screen name='Chat' component={Chat} />
//     </Stack.Navigator>
//   );
// }

// function AuthStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name='Login' component={Login} />
//       <Stack.Screen name='Signup' component={Signup} />
//     </Stack.Navigator>
//   );
// }

// function RootNavigator() {
//   const { user, setUser } = useContext(AuthenticatedUserContext);
//   const [isLoading, setIsLoading] = useState(true);
// useEffect(() => {
//     // onAuthStateChanged returns an unsubscriber
//     const unsubscribeAuth = onAuthStateChanged(
//       auth,
//       async authenticatedUser => {
//         authenticatedUser ? setUser(authenticatedUser) : setUser(null);
//         setIsLoading(false);
//       }
//     );
// // unsubscribe auth listener on unmount
//     return unsubscribeAuth;
//   }, [user]);
// if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size='large' />
//       </View>
//     );
//   }

// return (
//     <NavigationContainer>
//       {user ? <ChatStack /> : <AuthStack />}
//     </NavigationContainer>
//   );
// }

// export default function App() {
//   return (
//     <AuthenticatedUserProvider>
//       <RootNavigator />
//     </AuthenticatedUserProvider>
//   );
// }
