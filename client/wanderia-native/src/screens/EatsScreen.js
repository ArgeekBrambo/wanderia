import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { GOOGLE_MAPS_APIKEY } from '@env'
import MapEatsScreen from '../components/MapEatsScreen'
import MapView, { Marker } from 'react-native-maps'

const EatScreen = () => {
  return (
    <View className='flex-1 flex-col-reverse bg-black'>
      <View className='h-64 w-full bg-white'>

      </View>
      <View className='flex-1 w-full bg-gray-400'>
        <MapEatsScreen />
      </View>
    </View>
  )
}

export default EatScreen