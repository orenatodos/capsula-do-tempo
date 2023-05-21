import { cookies } from 'next/headers'
import dayjs from 'dayjs'
import dayjsPtBr from 'dayjs/locale/pt-br'
import { ArrowRightIcon } from 'lucide-react'

import { EmptyMemory } from '~/components/EmptyMemory'
import { api } from '~/lib/api'
import Image from 'next/image'
import Link from 'next/link'

type Memory = {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

dayjs.locale(dayjsPtBr)

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemory />
  }

  const userToken = cookies().get('token')?.value

  const memoriesResponse = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  })

  const memories: Memory[] = memoriesResponse.data

  if (memories.length === 0) {
    return <EmptyMemory />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => (
        <div key={memory.id} className="space-y-4">
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
          </time>

          <Image
            src={memory.coverUrl}
            alt=""
            width={592}
            height={280}
            className="aspect-video w-full rounded-lg object-cover"
          />

          <p className="text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>

          <Link
            href={`/memories/${memory.id}`}
            className="flex items-center gap-2 text-sm text-gray-100 transition-colors hover:text-gray-300"
          >
            Ler mais
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  )
}
