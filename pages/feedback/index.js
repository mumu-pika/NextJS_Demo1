/* 
  Here， we consider to load a new html page to list the feedbacks, instead of using a button
  We can pre-render this page and prefetch the data for pre-rendering
*/

import { buildFeedbackPath, extraFeedback } from '../api/feedback'
import { Fragment, useState } from 'react'

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState()


  function loadFeedbackHandler(id) {
    // /api/some-feedback-id
    fetch(`/api/${id}`)
      .then(response => response.json())
      .then(data => {
        setFeedbackData(data.feedback)
      })
  }

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map(
          item =>
            <li key={item.id}>
              {item.text}{" "}
              <button onClick={loadFeedbackHandler.bind(null, item.id)}>Show Details</button>
            </li>
        )}
      </ul>
    </Fragment>

  )
}
export async function getStaticProps() {
  // Attention!!
  // we should not use fetch inside of getStaticProps or getServerSideProps to talk to our own API
  // Instead, since it is all part of one project and therefore ultimately all served by one server
  // so here, we should use the api function directly.
  const filePath = buildFeedbackPath()
  const data = extraFeedback(filePath)

  return {
    props: {
      feedbackItems: data
    }
  }
}

export default FeedbackPage