import { createContext, useState, useEffect } from "react";

/* 
  The goal here is to create a new context,
  a new context for managing our notifications.
  We can provide an initialization object here,
  which defines the structure of this context,
  and the context so does the object,
  which will also be exposed to different components in our application later
*/

export const NotificationContext = createContext({
  notification: null, // {title, message, status}
  showNotification: function (notificationData) { }, // we will replace it with a different function in a different place
  hideNotification: function () { }
})


/* 
  Then, here we create a separate component,
  which also manages all the context related state.
  This component which we can get out of the context wrapped around prop children

  We can use the notification context provider component to wrap it around our components,
  which will then automatically have access to all our context.

  What' more, the NotificationContextProvider function should also manage all the context related state.
*/

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState()

  useEffect(() => {
    // check if activeNotification is set
    if (activeNotification &&
      (activeNotification.status === "success" ||
      activeNotification.status === "error")) {
        // 设置一个定时器，让notification能够自动隐藏
        const timer = setTimeout(()=>{
          setActiveNotification(null)
        }, 3000)

        // return the cleanup function
        return () => {
          clearTimeout(timer)
        }
    }
  }, [activeNotification])

  function showNotificationHandler(notificationData) {
    setActiveNotification({
      title: notificationData.title,
      message: notificationData.message,
      status: notificationData.status
    })
  }

  function hideNotificationHandler() {
    setActiveNotification(null)
  }

  /*
    Now, the goal is to bundle the notification data and these functions together into one object,
    which we can then distribute as context to the other components in the app.
  */

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler
  }

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext

