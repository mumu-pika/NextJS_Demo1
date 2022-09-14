 /* 
   这里实现一个发送表单数据请求的组件，来对应模拟api route.

 */

import { useRef, useState } from "react"

function EmailPage () {
  // feedback数组
  const [feedbackItems, setFeedbackItems] = useState([])

  // 表单元素标识
  const emailInputRef = useRef()
  const feedbackRef = useRef()

  function onSubmitHandler(event) {
    // 阻止提交的默认行为
    event.preventDefault()

    // 获取用户输入的内容
    const enteredEmail = emailInputRef.current.value
    const enteredFeedback = feedbackRef.current.value

    const reqBody = {email: enteredEmail, text: enteredFeedback}

    // 发送http请求, 这里我们将用户输入的数据post到后台
    // 形式如{ email: "xxx@xxxx.com", text: "some feedback texts"}
    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => response.json()).then(data => console.log(data))
  }

  // send a get request to my feedback api route
  function loadFeedbackHandler() {
    fetch('/api/feedback', {
      method: 'GET',
      // body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => response.json()).then(data => {
      setFeedbackItems(data.feedback)
    })
  }
  return (
    <div>
      <h1>Email page</h1>
      <form onSubmit={onSubmitHandler}>
        {/* htmlFor 对应标记表单元素 */}
        <label htmlFor="email">Enter email address</label>
        <br/>
        <input type="email" id="email" ref={emailInputRef}></input>
        <br/>
        <label htmlFor="feedback"> Enter your feedback, Thank you !</label>
        <br/>
        <textarea id="feedback" row="6" ref={feedbackRef}></textarea>
        <br/>
        <button>Submit</button>
      </form>
      <hr/>
      <button onClick={loadFeedbackHandler}>Load feedback</button>
      <ul>
        {feedbackItems.map(item => <li key={item.id}>{item.text}</li>)}
      </ul>
    </div>
  )
}

export default EmailPage