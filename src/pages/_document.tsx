import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="h-full antialiased dark">
      <Head />
      <body className="min-h-full flex flex-col bg-[#0D1117] text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
