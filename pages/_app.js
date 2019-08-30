import { Provider } from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../redux'

export default withRedux(initStore, {
  debug: process.env.NODE_ENV === 'production' ? false : true
})(
  class JelbrekApp extends App {
    render() {
      const { Component, pageProps, store } = this.props
      return (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      )
    }
  }
)
