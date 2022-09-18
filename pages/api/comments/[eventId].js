//  /api/comments/some-event-id

function handler(req, res) {
  const eventId = req.query.eventId
  if (req.method == 'POST') {
    // Add server-side validation
    const { email, name, text } = req.body

    // check
    if (email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid Input' })
      return
    }

    console.log(email, name, text)

    // 创建一个新的commment对象, 使用随机的random id
    const newComment = {
      id: new Date().toISOString(), //2014-06-18T02:33:24.000Z ISO字符串
      email,
      name,
      text
    }

    res.status(201).json({ message: 'Added comment', comment: newComment })

  }

  if (req.method == 'GET') {
    const dummyList = [
      { _id: "e1", name: "xixi", email: "test@qq.com", text: "first comment" },
      { _id: "e2", name: "lala", email: "gogo@qq.com", text: "second comment" }
    ]
    res.status(200).json({ comments: dummyList })
  }

}

export default handler