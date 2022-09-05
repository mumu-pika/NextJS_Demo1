import { useEffect, useState } from 'react'

// 引入swr
import useSWR from 'swr'

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales)
  // const [isLoading, setIsLoading] = useState(false)

  // 使用swr
  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR('https://nextjsdemo1-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json', fetcher)
  useEffect(() => {
    if (data) {
      const transformedSales = []

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume
        })
      }
      setSales(transformedSales)
    }
  }, [data])


  // useEffect(() => {
  //   // 设置加载状态为true
  //   setIsLoading(true)
  //   fetch(
  //     'https://nextjsdemo1-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json'
  //   ).then(response => response.json())
  //     .then(data => {
  //       // 后台的sales数据是一个对象，我们需要将其转换为数组
  //       const transformedSales = []

  //       for (const key in data) {
  //         transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume })
  //       }

  //       // 设置saLes数据
  //       setSales(transformedSales)
  //       setIsLoading(false)
  //     })
  // }, [])


  // // 如果没有加载完毕
  // if (isLoading) return (<p>Loading</p>)

  // // 由于isloading初始值为false,所以需要在这里处理下，不然sales为null
  // if (!sales) return <p>No data yet</p>

  // 下面是使用了swr以后的处理
  // 错误的处理
  if (error) return <p>Fail to load</p>

  // 如果没有加载完毕
  if (!data && !sales) return (<p>Loading</p>)


  return (
    <ul>
      {sales.map(sale => <li key={sale.id}>{sale.username}--{sale.volume}</li>)}
    </ul>
  )
}

export async function getStaticProps(context) {
  // 因为getStaticProps不是React的钩子，而是nextJS独有的，所以这里不能够使用ser
  const response = await fetch(
    'https://nextjsdemo1-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json'
  )
  const data = await response.json();
  // 后台的sales数据是一个对象，我们需要将其转换为数组
  const transformedSales = []

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume
    })
  }

  return {
    props: { sales: transformedSales },
    revalidate: 10  // 每10秒更新一次
  }
}



export default LastSalesPage