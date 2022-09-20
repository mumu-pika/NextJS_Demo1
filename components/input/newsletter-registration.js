import { useRef, useContext } from 'react';

import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';


function NewsletterRegistration() {
  const emailInputRef = useRef();

  // 引入notification上下文
  const notificationCtx = useContext(NotificationContext)

  function registrationHandler(event) {
    event.preventDefault();

    /* 
      Here, we can use the notificationContext object
      and call showNotification
      and pass a object with the notification data
      也就是是来触发上下文中的改变notification状态的方法
    */

    notificationCtx.showNotification({
      title: 'Signingup',
      message: 'Registering for newsletter',
      status: 'pending'
    })

    // send valid data to API
    // optional: validate input
    const enteredEmail = emailInputRef.current.value;

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        //  Due to 400 or 500 status code can not cause this promise to fail
        // So if we have an error status code, we will not make it into this catch block below
        // 那么如果我们想让这里出现异常的时候进入下面的catch块去捕获, 这里就需要进行下判断
        if (response.ok) {
          return response.json()
        }

        // 如果执行到这里, 说明已经出现了异常, 那么直接异常穿透
        return response.json().then(data => {
          throw new Error(data.message || 'Something went wrong!')
        })
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter!',
          status: 'success'
        })
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: 'Error',
          message: error.message || 'Something went wrong',
          status: 'error'
        })
      })

  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
