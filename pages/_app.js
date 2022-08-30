import Layout from '../components/layout/layout'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // 在这里我们可以用一些通用的layout component 包装这个组件
  // 我们可以在这里使用Fragment, 在顶部添加header
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )

}

export default MyApp
