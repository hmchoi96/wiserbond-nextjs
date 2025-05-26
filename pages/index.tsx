import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Wiserbond | Noise Off. Calm Think.</title>
        <meta name="description" content="In a chaotic market, clarity wins. Wiserbond helps you think clearly, not react blindly." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="macro strategy, economic insights, synthesizer tool, wiserbond, policy impact, industry analysis" />
        <meta name="author" content="Wiserbond Research" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Wiserbond | Noise Off. Calm Think." />
        <meta property="og:description" content="In a chaotic market, clarity wins. Wiserbond helps you think clearly, not react blindly." />
        <meta property="og:image" content="https://wiserbond.com/og-image.png" />
        <meta property="og:url" content="https://wiserbond.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Noise Off. Calm Think.</h1>
        <p className="mb-6 text-lg text-gray-600">
          Wiserbond turns chaotic macro signals into calm, actionable insights.
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
