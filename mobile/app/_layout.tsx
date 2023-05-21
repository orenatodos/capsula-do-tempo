import { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SplashScreen, Stack } from 'expo-router'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import * as SecureStore from 'expo-secure-store'

import blurBg from '../src/assets/images/bg.png'

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    boolean | null
  >(null)

  const [hasLoadedFonts] = useFonts({
    BaiJamjuree_700Bold,
    Roboto_400Regular,
    Roboto_700Bold
  })

  async function checkIfTheUserIsLoggedIn() {
    const token = await SecureStore.getItemAsync('token')

    setIsUserAuthenticated(!!token)
  }

  useEffect(() => {
    checkIfTheUserIsLoggedIn()
  }, [])

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground source={blurBg} className="flex-1 bg-gray-900">
      <StatusBar style="light" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent'
          },
          animation: 'fade'
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="new" />
      </Stack>
    </ImageBackground>
  )
}
