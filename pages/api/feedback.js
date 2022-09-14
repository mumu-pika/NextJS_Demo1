/* 
  nextJS会在这里使用这个函数handler并执行它
  for incoming requests sent to /api/feedback

  在handler这个函数里面, 我们不仅能够处理请求，而且我们不用返回html代码。而是，
  instead, this allows us to execute any server side code of our choice.

  Any code we write in here, will never end up in any client side code bundle.
  在handler中写的代码不会出现在客户端代码中， 所以这里的代码不会被exposed to visitors.

  Here, we will write nodejs code, and enhanced by the nextjs team, it looks a bit like express.js

*/
// server side code, we can use nodejs
import fs from 'fs'
import path from 'path'

// 创建文件路径
export function buildFeedbackPath() {
  return path.join(process.cwd(), 'data', 'feedback.json') // this will create an absolute path
}

// 提取数据
export function extraFeedback(filePath) {
  const fileData = fs.readFileSync(filePath)
  const data = JSON.parse(fileData) // 将JSON数据转换为js对象, 转换之后，data的是一个对象数组
  return data
}

function handler (req, res) {
  // check if it's a POST Method
  // req.method for finding out which kind of request it was
  if (req.method == 'POST') {
    // Here, we could try to extract data
    // 提取数据
    // req.body for accessing the submitted data
    const email = req.body.email
    const feedbackText = req.body.text

    // 拼接数据成数据
    const newFeedback = {
      // a unique identifier for every newFeedback
      // 这里使用时间来定义一个id, 虽然不恰当（因为同一时间可能会有发送两个请求等）, 但是在这里是足够了的
      id: new Date().toString(), // a dummy ID
      email: email,
      text: feedbackText
    }

    // 我们可以将上面拼接好的数据存储到数据库中, 在本地开发下，我将数据存储在/data/feedback.json中
    // store that in a database or in a file
    const filePath = buildFeedbackPath()
    // 接下来，我们就可以用获取到的新数据去覆盖更新数据了。
    // 这里先读取文件，然后再做对应的覆盖更新处理
    const data = extraFeedback(filePath)
    data.push(newFeedback) // 将新数据压入数组
    fs.writeFileSync(filePath, JSON.stringify(data)) // 将data重新变为JSON数据，并写回file

    // 返回处理结果以后的响应
    res.status(200).json({message: 'Success!', feedback: newFeedback})
  }
  else {
      const filePath = buildFeedbackPath()
      const data = extraFeedback(filePath)
      // status method allows us to set a status code.
      res.status(200).json({ feedback: data })
  }
}

export default handler