import { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Link, useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import dayjs from 'dayjs'
import dayjsPtBr from 'dayjs/locale/pt-br'
import Icon from '@expo/vector-icons/Feather'

import { api } from '../src/lib/api'

import NLWSpacetimeLogoImg from '../src/assets/images/nlw-spacetime-logo.svg'

dayjs.locale(dayjsPtBr)

type Memory = {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export default function Memories() {
  const [memories, setMemories] = useState<Memory[]>([])

  const router = useRouter()
  const { bottom, top } = useSafeAreaInsets()

  async function handleSignOut() {
    await SecureStore.deleteItemAsync('token')

    router.push('/')
  }

  async function loadMemories() {
    try {
      const userToken = await SecureStore.getItemAsync('token')

      const memoriesResponse = await api.get('/memories', {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })

      setMemories(memoriesResponse.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <NLWSpacetimeLogoImg />

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={handleSignOut}
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
          >
            <Icon name="log-out" size={16} color="#FFF" />
          </TouchableOpacity>

          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map((memory) => (
          <View key={memory.id} className="space-y-4">
            <View className="flex-row items-center gap-2">
              <View className="h-px w-5 bg-gray-50" />
              <Text className="font-body text-xs text-gray-100">
                {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY[')}
              </Text>
            </View>
            <View className="space-y-4">
              <Image
                source={{
                  uri: memory.coverUrl
                }}
                className="aspect-video w-full rounded-lg"
              />

              <Text className="font-body text-base leading-relaxed text-gray-100">
                {memory.excerpt}
              </Text>

              <Link href="/memories/:id" asChild>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <Text className="font-body text-sm text-gray-200">
                    Ler mais
                  </Text>
                  <Icon name="arrow-right" size={16} color="#9e9ea0" />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
