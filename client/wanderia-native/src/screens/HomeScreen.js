import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import NavOptions from "../components/NavOptions";
// import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import {
    setDestination,
    setOrigin,
    setLocationPermission,
} from "../stores/slices/navSlice";
import * as Location from "expo-location";
import NavFavorites from "../components/NavFavorites";

const HomeScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                dispatch(setLocationPermission(false));
            }
            dispatch(setLocationPermission(true));
            let location = await Location.getCurrentPositionAsync({});
            console.log("location", location);
            dispatch(
                setOrigin({
                    location: {
                        lat: location.coords.latitude,
                        lng: location.coords.longitude,
                    },
                    description: "Current Location",
                })
            );
        })();
    }, []);

    return (
        <SafeAreaView className="bg-white h-full">
            <View className="p-5">
                <Image
                    style={{ width: 100, height: 100, resizeMode: "contain" }}
                    source={{ uri: "https://links.papareact.com/gzs" }}
                />
                <GooglePlacesAutocomplete
                    placeholder="Where from?"
                    styles={{
                        container: { flex: 0 },
                        textInput: { fontSize: 18 },
                    }}
                    query={{
                        key: "AIzaSyCPqKoUKVc1aUxhG4vGluGxF3OOr8ProL4",
                        language: "en",
                    }}
                    onPress={(data, details = null) => {
                        // console.log(data.description, "<<<<<<<<");
                        // console.log(details.geometry);
                        // console.log(setOrigin, "setOrigin");
                        dispatch(
                            setOrigin({
                                location: details.geometry.location,
                                description: data.description,
                            })
                        );

                        dispatch(setDestination(null));
                    }}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    returnKeyType={"search"}
                    minLength={2}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />

                <NavOptions />
                <NavFavorites />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
