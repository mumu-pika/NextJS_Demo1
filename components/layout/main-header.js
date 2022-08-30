import Link from 'next/link'

import styles from './main-header.module.css'

function MainHeader() {
  return (
    <header className={styles.header}>
      {/* here is logo text */}
      <div className={styles.logo}>
        {/* 这里先设置返回首页 */}
        <Link href="/">Next Events</Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href= '/events'>Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainHeader