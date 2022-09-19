import { MongoClient } from 'mongodb'

// 创建client, 这里传入对应的database名, 拼接在url中
export function createClient(database) {
  // Connection URI
  const url = "mongodb+srv://pikamumu:tkjuXv2bqOpBCM0x@cluster0.elitdud.mongodb.net/" + database

  // Create a new MongoClient
  const client = new MongoClient(url)
  return client
}

// 添加数据到数据库中
export async function insertData(db, collection, data) {
  if (db == null) return
  return await db.collection(collection).insertOne(data)
}

// 获取数据从数据库中
export async function getData(db, collection, sort) {
  // 获取到所有评论并降序排列, 也就是自上往下从最新到最旧排序
  return await db.collection(collection).find().sort(sort).toArray()
}

// 连接数据库，并封装数据处理
export async function connectDB(req, res, database, collection, data) {
  if (req == null || res == null) return
  const client = createClient(database)
  const db = client.db()
  // 数据库连接的异常处理
  try {
    await client.connect()
    console.log("Connected successfully to server")
  }
  catch (error) {
    // if fail to connect
    res.status(500).json({ message: "Connect to the database failed !" })
    return
  }

  // 判断请求的类型来执行对应的数据库处理
  if (req.method == 'POST') {
    // 更新并插入email数据到数据库中的email表中
    try {
      const result = await insertData(db, collection, data)
      console.log("Insert successfully to server")
      return result
    }
    catch (error) {
      // if fail to insert
      res.status(500).json({ message: "Insert failed!" })
      return
    }
    finally {
      await client.close()
    }
  }
  else if (req.method == 'GET') {
    // 从数据库中获取数据
    try {
      const data = await getData(db, collection, { _id: -1 })
      console.log("get Data successfully from server")
      return data
    }
    catch (error) {
      // if fail to insert
      res.status(500).json({ message: "fetch data failed!" })
      return
    }
    finally {
      await client.close()
    }
  }
}