import { useRouter } from 'next/router'
import { getEventById } from '../../dummy-data'

function EventDetailPage() {
  const router = useRouter()
  const eventId = router.query.eventId

  // 获取匹配上的event
  const event = getEventById(eventId)

  // 需要判定一下event是否有找到
  if(!event) {
    return <p>No event found!</p>
  }
  return (
    <div>
      <h1>Event Detail</h1>
    </div>
  )
}
export default EventDetailPage