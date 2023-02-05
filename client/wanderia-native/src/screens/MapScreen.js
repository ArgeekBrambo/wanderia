import { View, Text } from "react-native";
import React from "react";
import Map from "../components/Map";
import MapView from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";

const MapScreen = () => {
    const stack = createNativeStackNavigator();

    return (
        <View>
            <View style={tw`h-1/2 w-full`}>
                <Map />
            </View>

            <View style={tw`h-1/2 w-full`}>
                <stack.Navigator>
                    <stack.Screen
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{ headerShown: false }}
                    />
                    <stack.Screen
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={{ headerShown: false }}
                    />
                </stack.Navigator>
            </View>
        </View>
    );
};

export default MapScreen;
