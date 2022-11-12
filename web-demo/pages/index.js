import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          It&apos;z Me Demo Webapp
        </h1>

        <p className={styles.description}>
          Select Component
        </p>

        <div className={styles.grid}>
          
          <Link href = './externalApp' className={styles.card}>
            <h2>External Applications &rarr;</h2>
            <p>Demonstration of how third-party apps interact with the blockchain.</p>
          </Link>
      
          <Link
            href="./chainFunctions"
            className={styles.card}
          >
            <h2>Blockchain Functions &rarr;</h2>
            <p>
              View features and functions of the blockchain.
            </p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}