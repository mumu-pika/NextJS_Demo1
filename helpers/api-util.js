/*
  在这里实现对于后端api获取的数据的过滤操作。
  其实这部分可以通过对后端服务器本身做好过滤操作来实现，因为这样这里就不用获取全部的数据了。
*/

// 在这里实现从后端获取全部的event data
export async function getAllEvents() {
  const response = await fetch('https://nextjsdemo1-default-rtdb.asia-southeast1.firebasedatabase.app/events.json')
  // 注意！这里的json()是一个异步方法, 所以也需要await
  const data = await response.json()

  // 这里跳过了异常处理
  // Firebase 会返回一个对象，所以这里需要转换一下格式
  const events = []
  for (const key in data) {
    events.push({
      id: key,
      ...data[key]
    })
  }
  return events
}

// 过滤出特定 的事件
export async function getFeaturedEvents() {
  const allEvents = await getAllEvents()
  return allEvents.filter((events)=> events.isFeatured)
}

// 根据事件id来获取事件
export async function getEventById(id) {
  const allEvents = await getAllEvents()
  return allEvents.find((event) => event.id === id)
}

// 根据筛选条件返回时间合适的事件
export async function getFilteredEvents(dateFilter) {
  const allEvents = await getAllEvents()
  const { year, month } = dateFilter
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date)
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
  })

  return filteredEvents
}