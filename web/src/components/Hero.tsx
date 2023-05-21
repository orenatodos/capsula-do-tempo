import Image from 'next/image'
import Link from 'next/link'

import nlwSpacetimeLogoImg from '~/assets/images/nlw-spacetime-logo.svg'

export function Hero() {
  return (
    <div className="space-y-5">
      <Image src={nlwSpacetimeLogoImg} alt="NLW Spacetime" />

      <div className="max-w-[420px] space-y-1">
        <h1 className="text-4xl font-bold leading-tight text-gray-50">
          Sua cápsula do tempo
        </h1>
        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <Link
        href="/memories/new"
        className="inline-flex items-center justify-center rounded-full bg-green-500 px-5 py-3 font-secondary text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
      >
        Cadastrar lembrança
      </Link>
    </div>
  )
}
