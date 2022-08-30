import Link from "next/link"

import styles from './button.module.css'

// 按钮组件 (1、实现跳转按钮 2、实现普通按钮用于提交)
// 使用的地方有event-item
function Button(props) {
  if (props.link) {
    return (
      <Link href={props.link}>
        <a className={styles.btn}>{props.children}</a>
      </Link>
    )
  }

  return <button className={styles.btn} onClick={props.onClick}>{props.children}</button>

}

export default Button