import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// 引入本地模拟的数据
import { getFeaturedEvents } from '../dummy-data'

// 引入组件
import EventList from '../components/events/event-list'

export default function Home() {
  const featuredEvents = getFeaturedEvents()

  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS_Demo1</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          The Home Page
        </h1>
        <div>
          <EventList items={featuredEvents}/>
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
