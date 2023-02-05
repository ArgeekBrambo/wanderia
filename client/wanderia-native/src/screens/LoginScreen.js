import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Input, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigation()

  const handleLogin = () => {
    // console.log(email, password)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => console.log('success login'))
      .catch((error) => { alert(error.message) });
  }

  return (
    <View className='flex-1 items-center justify-center p-4'>
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
        <Button title='Register' onPress={()=>navigate.navigate('RegisterScreen')}/>
        <Button title='Login' onPress={handleLogin}/>
      </View>
    </View>
  )
}

export default LoginScreen