const DUMMY_EVENTS = [
  {
    id: 'e1',
    title: 'Programming will make our life better!',
    description: 'Everyone can learn to code!',
    location: 'Shanghai, Bund 18',
    date: '2020-05-21',
    image: 'images/happyDays.jpg',
    isFeatured: false
  },
  {
    id: 'e2',
    title: 'Take a world trip! ',
    description: 'Let\'s have a different way to see the world',
    location: 'London, NewStreet 9025',
    date: '2021-11-11',
    image: 'images/tour.jpg',
    isFeatured: true
  },
  {
    id: 'e3',
    title: 'What a super cool guy !',
    description: 'The latest king of Caoxi',
    location: 'North Caoxi Road, Shanghai, 200030, China',
    date: '2022-02-30',
    image: 'images/king.jpg',
    isFeatured: true
  },
]

// 返回特定的事件
export function getFeaturedEvents() {
  return DUMMY_EVENTS.filter((events)=> events.isFeatured)
}

// 返回所有事件
export function getAllEvents() {
  return DUMMY_EVENTS
}

// 根据筛选条件返回时间合适的事件
export function getFilteredEvents(dateFilter) {
  const { year, month } = dataFilter
  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date)
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
  })

  return filteredEvents
}

// 根据事件id来获取事件
export function getEventById(id) {
  return DUMMY_EVENTS.find((event) => event.id === id)
}