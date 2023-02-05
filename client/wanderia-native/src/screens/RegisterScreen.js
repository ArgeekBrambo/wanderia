import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Input, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../config/firebase'

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigation()

  const handlRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, { displayName: name, photoURL: imgUrl?imgUrl:`https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fdefault-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-image179376714&psig=AOvVaw0HzgEK4IKcyWF_hEDLK7gT&ust=1675411264800000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNCnsLyv9vwCFQAAAAAdAAAAABAE`})
        .then(() => console.log('success register'))
      })
      .catch((error) => alert(error.message));
  }



  return (
    <View className='flex-1 items-center justify-center p-4'>
      <Input 
        placeholder='Enter your name'
        label='name'
        value={name}
        leftIcon={{ type: 'material', name: 'person' }}
        onChangeText={(text) => setName(text)}
      />
      <Input 
        placeholder='Enter your photo url'
        label='imgUrl'
        value={imgUrl}
        leftIcon={{ type: 'material', name: 'person' }}
        onChangeText={(text) => setImgUrl(text)}
      />
      <Input 
        placeholder='Enter your email'
        label='Email'
        value={email}
        leftIcon={{ type: 'material', name: 'email' }}
        onChangeText={(text) => setEmail(text)}
      />
      <Input 
        placeholder='Enter your password'
        label='password'
        value={password}
        leftIcon={{ type: 'material', name: 'lock' }}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <View className='flex-row gap-4'>
      <Button title='Register' onPress={handlRegister}/>
      </View>
    </View>
  )
}

export default RegisterScreen