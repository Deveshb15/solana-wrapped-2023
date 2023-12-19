import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
          {/* You can include other links, scripts, or styles here */}
        </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
