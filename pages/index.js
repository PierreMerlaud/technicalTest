import Head from "next/head";
import DisplayingData from "../components/DisplayingData";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Metal Bands 2017</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <DisplayingData />
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>
    </div>
  );
}
