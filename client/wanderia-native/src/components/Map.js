import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { useSelector } from "react-redux";
import {
    selectOrigin,
    selectDestination,
    selectWaypoints,
} from "../stores/slices/navSlice";
import MapViewDirections from "react-native-maps-directions";

const Map = () => {
    const origin = useSelector(selectOrigin);
    // console.log("origin", origin);
    const destination = useSelector(selectDestination);
    const waypoints = useSelector(selectWaypoints);
    const mapRef = useRef(null);

    useEffect(() => {
        if (!origin || !destination) return;

        // Zoom and fit to markers
        mapRef.current.fitToSuppliedMarkers(
            ["origin", "destination", "waypoint"],
            {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            }
        );
    }, [origin, destination]);

    return (
        <MapView
            ref={mapRef}
            style={tw`h-full w-full`}
            mapType="mutedStandard"
            initialRegion={{
                // use device current location
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin && destination && waypoints && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    waypoints={waypoints}
                    apikey="AIzaSyCPqKoUKVc1aUxhG4vGluGxF3OOr8ProL4"
                    strokeWidth={3}
                    strokeColor="blue"
                />
            )}

            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier="origin"
                />
            )}

            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier="destination"
                />
            )}

            {waypoints?.map((waypoint, index) => {
                return (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: waypoint.latitude,
                            longitude: waypoint.longitude,
                        }}
                        title="Waypoint"
                        description={waypoint.description}
                        identifier="waypoint"
                    />
                );
            })}
        </MapView>
    );
};

export default Map;

const styles = StyleSheet.create({});
