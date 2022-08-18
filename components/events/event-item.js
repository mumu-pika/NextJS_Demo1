import Image from 'next/image'
import Button from '../ui/button'

// 引入css模块样式
import styles from './event-item.module.css'

// 引入图标组件
import AddressIcon from '../icons/address-icon'
import DateIcon from '../icons/date-icon'
import DocumentIcon from '../icons/document-icon'
import ArrowRightIcon from '../icons/arrow-right-icon'

function EventItem(props) {
  // 解构赋值
  const { id, title, description, location, date, image } = props

  // 这里解构出来的date格式为：2020-05-21, 这是我们可读的格式
  // 这里我们将date传给Date()这个日期构造函数,将其转为js对象
  // toLocalDateString() 能够返回日期对象部分的字符串， 传入参数为locaLe语言环境以及配置项options
  // dateObj.toLocaleDateString([locales [, options]])
  // 在locale为'en-US'下, 输出格式如：12/19/2012
  const newDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  // 这里将location中的 “，” 替换为换行符
  // 之后需要添加效果使得这里的换行符达到换行的效果
  const formattedAddress = location.replace(',', '\n')

  // 动态注入id给到url
  const exploreLink = `/events/${id}`

  return (
    <li className={styles.item}>
      <Image src={'/' + image} alt={title} width={400} height={280}></Image>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.content}>
          <div className={styles.date}>
            <DateIcon />
            <time>{newDate}</time>
          </div>
          <div className={styles.description}>
            <DocumentIcon/>
            <span>{description}</span>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
          <div className={styles.actions}>
            <Button link={exploreLink}>
              <span>
                Explore Event
              </span>
              <span className={styles.icon}>
                <ArrowRightIcon />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default EventItem