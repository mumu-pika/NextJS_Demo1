import { useEffect, useState } from 'react'


function LastSalesPage() {
  const [sales, setSales] = useState()
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    // 设置加载状态为true
    setIsLoading(true)
    fetch(
      'https://nextjsdemo1-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json'
    ).then(response => response.json())
      .then(data => {
        // 后台的sales数据是一个对象，我们需要将其转换为数组
        const transformedSales = []

        for (const key in data) {
          transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume })
        }

        // 设置saLes数据
        setSales(transformedSales)
        setIsLoading(false)
      })
  }, [])


  // 如果没有加载完毕
  if (isLoading) return (<p>Loading</p>)

  // 由于isloading初始值为false,所以需要在这里处理下，不然sales为null
  if (!sales) return <p>No data yet</p>

  return (
    <ul>
      {sales.map(sale => <li key={sale.id}>{sale.username}--{sale.volume}</li>)}
    </ul>
  )
}




export default LastSalesPage