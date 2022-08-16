import EventItem from "./event-item"

function EventList(props) {
  const { items } = props
  console.log("123",items)
  return (
    <ul>
      {items.map(event => (
        <EventItem
          // key={event.id}
          // id={event.id}
          // title={event.title}
          // description={event.description}
          // location={event.location}
          // date={event.date}
          // image={event.image}
        />
      ))}
    </ul>
  )
}

export default EventList