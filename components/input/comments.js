import { useEffect, useState, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const notificationCtx = useContext(NotificationContext)

  // 使用一个local State 来记录加载页的情况
  const [isFetchingComments, setIsFetchingComments] = useState(false)


  useEffect(() => {
    // 如果有评论，去获取评论
    if (showComments) {
      setIsFetchingComments(true) // 正在获取评论
      fetch('/api/comments/' + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false)
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Submit Comment',
      message: 'adding your comment...',
      status: 'pending'
    })

    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) =>{
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
          message: 'Successfully submit your comment!',
          status: 'success'
        })
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error',
          message: error.message || 'Something went wrong',
          status: 'error'
        })
      })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading</p>}
    </section>
  );
}

export default Comments;
