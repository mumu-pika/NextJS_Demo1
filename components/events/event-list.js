import EventItem from "./event-item"

import styles from './event-list.module.css'

// 事件列表组件
function EventList(props) {
  const { items } = props
  return (
    <ul className={styles.list}>
      {items.map(event => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          description={event.description}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
    </ul>
  )
}

export default EventList