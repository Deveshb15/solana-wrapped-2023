import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        <title>Your Solana Wallet Wrapped - 2023</title>
        <meta
          name="description"
          content="Where Solana wallet users get a deep dive into their top transactional moments of the year."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Watch Something Wonderful" />
        <meta
          property="og:description"
          content="Where Solana wallet users get a deep dive into their top transactional moments of the year."
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/X5SwdM7/Solana-Wrapped-Preview.png"
        />
        <meta
          property="og:url"
          content="https://www.solanawrapped.xyz/"
        />
        <meta name="twitter:title" content="Watch Something Wonderful" />
        <meta
          name="twitter:description"
          content="Where Solana wallet users get a deep dive into their top transactional moments of the year."
        />
        <meta
          name="twitter:image"
          content="https://i.ibb.co/X5SwdM7/Solana-Wrapped-Preview.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
