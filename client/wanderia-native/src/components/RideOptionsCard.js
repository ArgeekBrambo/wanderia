import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

const RideOptionsCard = () => {
    return (
        <SafeAreaView className="bg-white flex-grow">
            <View>
                <TouchableOpacity>
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text className="text-center py-5 text-xl">Select a Ride</Text>
            </View>
        </SafeAreaView>
    );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
