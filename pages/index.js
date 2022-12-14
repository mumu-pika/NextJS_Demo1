import Head from 'next/head'
import Image from 'next/image'

// 引入nodejs中的fs，注意这里是在getStaticProps中使用fs,nextJS会自动区分开，单独分包
// import fs from 'fs/promises'
// import path from 'path'

import {useRouter} from 'next/router'
import Link from 'next/link'

// 引入样式
import styles from '../styles/Home.module.css'

// 引入本地模拟的数据
// import { getAllEvents, getFeaturedEvents } from '../dummy-data'

// 引入event数据（从后端请求获取到的）
import { getAllEvents, getFeaturedEvents } from '../helpers/api-util'

// 引入组件
import EventList from '../components/events/event-list'
import EventSearch from '../components/events/event-search'
import { features } from 'process'
import NewsletterRegistration from '../components/input/newsletter-registration';


// // prepares the props for components
// // nextJS will first execute getStaticProps before executing the component function
// export async function getStaticProps(context) {
//   // 借助于nodejs中的path来帮我们拼接路径
//   // process.cwd() cwd(current working directory), 这里是指整个nextjs项目文件夹，而不是page文件夹
//   const filepath = path.join(process.cwd(), "data", "dummy-backend.json")
//   const jsonData =  await fs.readFile(filepath)
//   const data = JSON.parse(jsonData)

//   // 校验数据，如果数据没有，需要借助于redirect做重定向
//   if(!data) {
//     return {
//       redirect: {
//         // 这里重定向到相应的目录去处理
//         destination: '/no-data'
//       }
//     }
//   }

//   // 校验数据， 借助于notFound这个key, 返回404页面
//   if (data.products.length === 0) return { notFound: true}
//   return {
//     props: {
//       products: data.products
//     },
//     // 重新验证，需要给nextJS一个确切的时间去做重新预渲染
//     // 为的是能应对需要高度更新的场景，在部署之后仍然会做更新
//     revalidate: 10,
//     // notFound: true // 如果notFound为true会返回404.html
//   }
// }

export default function Home(props) {
  // products for static generation
  const {products} = props

  // const featuredEvents = getFeaturedEvents()
  // const allEvents = getAllEvents()
  const allEvents = props.allEvents

  // 使用路由
  const router = useRouter()

  // 定义一个寻找event的回调
  function findEventsHandler(year, month) {
    // 根据选定年月来给出对应的路径
    const fullPath = `/events/${year}/${month}`
     router.push(fullPath)
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS_Demo1</title>
        <meta name="description" content="A lot of interesting events!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <h1 className={styles.title}>
          The Home Page
        </h1> */}
        <NewsletterRegistration />
          {/* <EventList items={featuredEvents}/> */}
          <EventSearch onSearch={findEventsHandler}/>
          <EventList items={allEvents}/>
          {/* products for static generation */}
          {/* <ul>
            {products.map(product => (
              <li key={product.id}>
                <Link href={`/products/${product.id}`}>
                  {product.title}
                </Link>

              </li>
            ))}
          </ul> */}
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

/*
  作为起始页，比较好的效果是让用户直接看见需要呈现的内容
  这些事件本身并不是需要登录以后才显示的内容或是用户特定的内容，而这些内容应该需要能更好的被搜索引擎爬虫所捕获，
  这样能更好的将流量引导（direct traffic）到我们的网站

  那么我们接下来需要考虑的是：
  使用static generation 还是 server-side render 呢？
  在这里，我们不需要为每个请求预渲染它，所以这里使用getStaticProps比较有意义。
*/

export async function getStaticProps() {
  const allEvents = await getAllEvents()
  return {
    // 这里我们使用firebase中的预处理好的数据，而不是本地的数据
    // 参考firebase文档：https://firebase.google.com/docs/database/rest/start
    // 在helpers文件夹下实现api数据的获取

    props: {
      allEvents: allEvents
    },

    // 定时更新预渲染的内容，不用重新部署
    // 这里设定每300s更新一下 ，for a new coming request
    revalidate: 300
  }
}