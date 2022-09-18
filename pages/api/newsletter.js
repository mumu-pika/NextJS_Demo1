function handler(req, res) {
  // check the request method
  if (req.method == 'POST') {
    const userEmail = req.body.email

    // check if the email is valid
    // front-end validation is always just a convenience feature
    // we should validate in our API route
    // and this code can't be viewed or changed by the users
    if (!userEmail || !userEmail.includes('@')) {
      // 状态码 422 则表现为请求格式错误，但出现了 语义 错误，以至于服务端无法响应
      res.status(422).json({message:'Invalid email address.'})
      return
    }

    res.status(202).json({message:'Well Done! Sign up Successfully!'})

  }
}

export default handler