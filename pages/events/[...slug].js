import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../helpers/api-util'
import EventList from '../../components/events/event-list'
import { Fragment } from 'react'

import Head from 'next/head'


// 显示过滤事件的列表
// 我们需要从router中提取关键信息，比如：年份和月份
function FilteredEventsPage(props) {
  // 设置头部信息
  // const pageHeadData = (
  //   <Head>
  //     <title>FilteredEvents</title>
  //     <meta name="description" content={`All events for ${numMonth} / ${numYear}`} />
  //   </Head>
  // )

  // const router = useRouter()
  // const filterData = router.query.slug

  // 检验filterData数据
  // 如果没有过滤的数据，返回一个等待的界面
  if (props.loading) {
    return (
      <p className='center '>Loading...</p>
    )
  }
  // 如果正确传入了过滤数据, 这里提取出来以后还是字符串
  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // 将数据转为数字
  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  // check 数字是否合规
  if (props.hasError) {
    return (
      <p>Invalid filter. Please adjust your values!</p>
    )
  }

  // 如果前面校验都通过了，拿着选定的数据去获取对应的events
  // const filteredEvents = getFilteredEvents({
  //   year: numYear,
  //   month: numMonth
  // })

  const filteredEvents = props.filteredEvents

  // 校验filteredEvents, 因为可能出现我们有了有效地过滤，但是找不到过滤出来的任何事件
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <p>No events found for the chosen filter</p>
    )
  }

  return (
    <Fragment>
      {/* {pageHeadData} */}
      <EventList items={filteredEvents} />
    </Fragment>
  )
}

// 在这里由于是根据年月来过滤出事件，所以会比较取决于请求所需的年月参数，以及考虑到特殊性
// 因此这里使用getServerSideProps更为合适

export async function getServerSideProps(context) {
  const { params } = context

  const filterData = params.slug

  if (!filterData) {
    return { props: { loading: true } }
  }
  console.log(filterData)

  // 如果正确传入了过滤数据, 这里提取出来以后还是字符串
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  // 将数据转为数字
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // check 数字是否合规
  if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2000 || numMonth < 1 || numMonth > 12) {
    return {
      props: { hasError: true }
      // notFound: true,
      // 404之后，我们可以重定向过去
      // redirect: {
      //   destination: '/error'
      // }
    }
  }

  // 如果前面校验都通过了，拿着选定的数据去获取对应的events
  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth
  })


  return {
    props: {
      filteredEvents: filteredEvents
    }
  }
}


export default FilteredEventsPage