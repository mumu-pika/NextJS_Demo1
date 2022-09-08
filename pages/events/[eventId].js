import { useRouter } from 'next/router'
import { getAllEvents, getEventById } from '../../helpers/api-util'

import EventItem from '../../components/events/event-item'


function EventDetailPage(props) {
  // const router = useRouter()
  // const eventId = router.query.eventId

  // 获取匹配上的event
  // const event = getEventById(eventId)

  const event = props.event

  // 需要判定一下event是否有找到
  if (!event) {
    return <p>No event found!</p>
  }
  return (
    <div>
      <EventItem
        key={event.id}
        id={event.id}
        title={event.title}
        description={event.description}
        location={event.location}
        date={event.date}
        image={event.image}
      />
    </div>
  )
}

export async function getStaticProps(context) {
  // 这里我们需要要借助于context, 因为我们需要知道需要为哪个特定事件id来加载事件数据
  const eventId = context.params.eventId

  const event = await getEventById(eventId)

  return {
    props: {
      event: event
    },
    // 定时每隔一段时间进行更新
    revalidate: 30
  }
}

// 因为这里是动态页面，所以还需要借助于getStaticPaths()
export async function getStaticPaths() {
  const events = await getAllEvents()

  const paths = events.map(event =>({ params: { eventId: event.id } }))

  return {
    paths: paths,
    fallback: true
  }
}


export default EventDetailPage