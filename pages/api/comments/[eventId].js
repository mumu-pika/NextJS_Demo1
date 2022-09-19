//  /api/comments/some-event-id
import { connectDB } from '../../../helpers/db-util'

async function handler(req, res) {
  const eventId = req.query.eventId // 获取相关联的eventId

  if (req.method == 'POST') {
    // Add server-side validation
    const { email, name, text } = req.body

    // check
    if (!email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid Input' })
      return
    }

    // 创建一个新的commment对象, 使用随机的random id
    const newComment = {
      // id: new Date().toISOString(), //2014-06-18T02:33:24.000Z ISO字符串
      // 这里mongodb会自动分配一个id, 所以不用再加上这个id, 额外的，需要存储相关联的eventid
      email,
      name,
      text,
      eventId
    }

    const result = await connectDB(req, res, "events", "comments", newComment)

    // 将mongoDB中自动赋予的id赋予给newComment
    newComment._id = result.insertedId

    // post正常，返回数据
    res.status(201).json({ message: 'Added comment', comment: newComment })
  }

  if (req.method == 'GET') {
    const data = await connectDB(req, res, "events", "comments")
    // const dummyList = [
    //   { _id: "e1", name: "xixi", email: "test@qq.com", text: "first comment" },
    //   { _id: "e2", name: "lala", email: "gogo@qq.com", text: "second comment" }
    // ]

    res.status(200).json({ comments: data })
  }
}

export default handler