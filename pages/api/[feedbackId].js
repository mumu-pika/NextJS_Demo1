/* 
  dynamic API Routes
  We need to know which concrete value was encoded in the URL as a value for this placeholder
  dynamic API Routes can not just handle get request 
*/

import { buildFeedbackPath, extraFeedback} from './feedback'

function handler(req, res) {
  // check request
  // if (req.method === "POST") {}

  // req.query for getting access to query parameters and regular parameters.
  const feedbackId = req.query.feedbackId
  const filePath = buildFeedbackPath()
  const feedbackData = extraFeedback(filePath)

  const selectedFeedback = feedbackData.find(feedback => feedback.id === feedbackId)

  res.status(200).json({feedback: selectedFeedback})
}

export default handler