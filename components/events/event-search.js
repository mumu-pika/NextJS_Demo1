import { useRef } from 'react';

import Button from '../ui/button'
import styles from '../events/event-search.module.css'

// 实现事件查询功能
function EventSearch(props) {
  const yearInputRef = useRef();
  const monthInputRef = useRef();


  // 表单提交的逻辑
  function submitHandler(event) {
    event.preventDefault(); // 防止浏览器默认发送http request

    // 获取选定的年份和月份
    const selectedYear = yearInputRef.current.value;
    const selectedMonth = monthInputRef.current.value;

    // 执行搜索选定的事件
    props.onSearch(selectedYear, selectedMonth);

  }

  // 返回的是一个表格
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.controlWrapper}>
        {/* 年份 */}
        <div className={styles.control}>
          <label htmlFor="year">Year:</label>
          <select id="year" ref={yearInputRef}>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>

        {/* 月份 */}
        <div className={styles.control}>
          <label htmlFor="month">Month:</label>
          <select id="month" ref={monthInputRef}>
            <option value='1'>January</option>
            <option value='2'>February</option>
            <option value='3'>March</option>
            <option value='4'>April</option>
            <option value='5'>May</option>
            <option value='6'>June</option>
            <option value='7'>July</option>
            <option value='8'>August</option>
            <option value='9'>September</option>
            <option value='10'>October</option>
            <option value='11'>November</option>
            <option value='12'>December</option>
          </select>
        </div>

        {/* 搜索按钮, 在这里它的作用应该是提交表单信息 */}
        <Button> Find Events</Button>
      </div>
    </form>
  )
}

export default EventSearch