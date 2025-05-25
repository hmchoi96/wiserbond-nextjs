// pages/index.tsx
import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Wiserbond | Simplifying Macro Strategy</title>
        <meta name="description" content="Wiserbond turns macroeconomic noise into clear, actionable strategy. Try our Synthesizer Tool now." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="macro strategy, economic insights, synthesizer tool, wiserbond, policy impact, industry analysis" />
        <meta name="author" content="Wiserbond Research" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
    </>
  )
}
