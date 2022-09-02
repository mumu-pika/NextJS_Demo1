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

// 获取数据， 实际情况会是
async function getData() {
  const filepath = path.join(process.cwd(), "data", "dummy-backend.json")
  const jsonData = await fs.readFile(filepath)
  const data = JSON.parse(jsonData)
  // 这里的data被转为了一个js对象
  return data
}


// 我们可以使用nexyJS提供的context来获取具体的数据信息
export async function getStaticProps(context) {
  const { params } = context
  const data = await getData()
  const productId = params.pid

  // 去匹配数据，找到需要的product
  const product = data.products.find(product => product.id === productId)

  // 如果没有product，设置notFound
  if(!product) {
    return {notFound: true};
  }

  return {
    props: {
      loadedProduct: product
    }
  }
}

// 这里在paths中设置了3条，之后NextJS会调用getStaticProps 3次
export async function getStaticPaths() {
  const data = await getData()
  // 获取到ids数组
  const ids = data.products.map(product => product.id)

  const params = ids.map(id => ({ params: { pid: id } }))

  return {
    // paths: [
    //   { params: { pid: 'p1' } },
    //   // { params: { pid: 'p2' } },
    //   // { params: { pid: 'p3' } },
    // ],
    paths: params,
    fallback: true
  }
}

export default ProductDetailPage