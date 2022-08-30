import { Fragment } from "react"
import MainHeader from "./main-header"


// layout组件用来包装整个全局组件
// 见pages/_app.js

function Layout(props) {
  return (
    <Fragment>
      {/* 这里的header另外做封装，由main-header来实现 */}
      <MainHeader/>
      <main>
        {props.children}
      </main>
    </Fragment>
  )
}

export default Layout