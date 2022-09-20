import { Fragment, useContext } from "react"
import MainHeader from "./main-header"
import Notification from "../ui/notification"
import NotificationContext from "../../store/notification-context"


// layout组件用来包装整个全局组件
// Layout component, a wrapper for visual component
// 见pages/_app.js

function Layout(props) {
  /* 
    We can call useContext and then pass the Context to which we want to establish a connection
    as a argument to useContext

    在useContext之后，我们可以使用notification中的方法或是获取到当前通知的数据，
    这样我们就能控制通知的显式或是隐藏
  */
  const notificationCtx = useContext(NotificationContext)

  /* 
    如果这里的 activeNotification 不为空, 那么就需要
    render this notification with the data stored in activeNotification
  */
  const activeNotification = notificationCtx.notification


  return (
    <Fragment>
      {/* 这里的header另外做封装，由main-header来实现 */}
      <MainHeader />
      <main>
        {props.children}
      </main>
      {activeNotification && (
        <Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status} />
      )}
    </Fragment>
  )
}

export default Layout