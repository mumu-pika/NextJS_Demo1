import { Fragment } from "react"
import fs from 'fs/promises'
import path from 'path'

function ProductDetailPage(props) {
  const { loadedProduct } = props


  // 这个是对于fallback 为 true的兜底操作
  if (!loadedProduct) {
    return <p>Loading...</p>
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <h1>{loadedProduct.description}</h1>
    </Fragment>
  )
}

// 我们可以使用nexyJS提供的context来获取具体的数据信息
export async function getStaticProps(context) {
  const { params } = context

  const productId = params.pid

  const filepath = path.join(process.cwd(), "data", "dummy-backend.json")
  const jsonData = await fs.readFile(filepath)
  const data = JSON.parse(jsonData)

  // 去匹配数据，找到需要的product
  const product = data.products.find(product => product.id === productId)
  return {
    props: {
      loadedProduct: product
    }
  }
}

// 这里在paths中设置了3条，之后NextJS会调用getStaticProps 3次
export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: 'p1' } },
      // { params: { pid: 'p2' } },
      // { params: { pid: 'p3' } },
    ],
    fallback: true 
  }
}

export default ProductDetailPage