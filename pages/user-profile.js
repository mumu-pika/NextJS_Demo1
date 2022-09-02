// dummy user-profile
// 一开始这是一个我们无法做预渲染的页面
// 因为我们需要知道我们做预渲染的这个页面是为了给哪个用户使用
// 因此我们期望用户ID能作为URL的一部分
// 我们需要去识别发出请求的用户，假设这里借助于之前设置的cookie
// 这里我们return一些用户的信息，同样的，
// 我们需要获得访问到请求对象的权限
// 但我们不能预渲染这个页面，因为我们不知道哪些用户会提前，而且我们无法提前访问他们的cookie
// 因此，我们需要导出一个异步函数 getServerSideProps
// 此外另一个使用getServerSideProps的情况是：
//     例如有 高度动态的数据，每秒变化多次, 任何旧页面都会是过时的

function UserProfilePage(props) {
  return (
    <h1>{props.username}</h1>
  )
}

export default UserProfilePage

export async function getServerSideProps(context) {
  // 我们可以从context获得一些参数，不同于getStaticProps,
  // 这里我们还能从context获取到请求req和响应res
  const { params, req, res } = context

  return {
    props: {
      username: 'pika'
    }
  }
}