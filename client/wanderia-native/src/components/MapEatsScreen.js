import { View, Text } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'

const bussinessMarker = [
  {
    id: 1,
    name: 'Bakso Pak Budi',
    icon: '1F969',
    longitude: 106.7815256,
    latitude: -6.2610437
  },
  {
    id: 2,
    name: 'Pizza',
    icon: '1F355',
    longitude: 106.7815256,
    latitude: -6.2603437
  }
]

const MapEatsScreen = () => {
  return (
    <>
      <MapView
        className='flex-1'
        initialRegion={{
          maptype: 'mutedStandard',
          latitude: -6.2608437,
          longitude: 106.7815256,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        // showsUserLocation={true} // baca react native permission
      >

        {
          bussinessMarker.map((marker) => (
            <Marker key={marker.id} coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude}
            } title={marker.name} description='origin'>
              <View className='p-2 bg-white rounded-full shadow border-[1px] border-gray-200'>
                <Text className='text-3xl'>{String.fromCodePoint(parseInt (marker.icon, 16))}</Text>
              </View>
            </Marker>
          ))
        }
      </MapView>
    </>
  )
}

export default MapEatsScreen