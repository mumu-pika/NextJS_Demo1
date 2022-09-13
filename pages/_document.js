/* 
  _app.js是Application shell 应用程序的外壳, 我们可以将_app.js想象成根组件
  而这个root component is inside of the body section of the HTML document

  _document.js allows us to customize the entire HTML document
  这里必须要使用类组件，因为它需要extend some component offered and provided by nextJS

  _document.js allows us to add HTML content outside of our application component tree
*/

import Document, {Html, Head, Main, NextScript} from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Head>
      </Html>
    )
  }
}

export default MyDocument