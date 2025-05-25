// pages/index.tsx
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Wiserbond</h1>
      <p className="mb-6 text-lg text-gray-600">
        Simplifying macro trends into decision-ready insights.
      </p>
      <Link
        href="/synthesizer"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Try the Synthesizer Tool →
      </Link>
    </div>
  )
}
