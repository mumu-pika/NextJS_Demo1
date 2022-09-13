import Layout from '../components/layout/layout'

import '../styles/globals.css'

import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  // 在这里我们可以用一些通用的layout component 包装这个组件
  // 我们可以在这里使用Fragment, 在顶部添加header
  // NextJS会自动合并多个head, 还有元素等等, 所以如果在appjs中的head也会出现在有自定义head的page Component中
  // 但如果是同一个name, 会被后者所覆盖
  return (
    <Layout>
      <Head>
        <title>Happy Events</title>
        <meta name="description" content="NextJS Events" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" / >
      </Head>
      <Component {...pageProps} />
    </Layout>
  )

}

export default MyApp
