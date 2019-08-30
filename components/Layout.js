import React, { PureComponent } from 'react'
import Footer from './Footer'
export default class Layout extends PureComponent {
  render() {
    return (
      <div className="flex flex-col min-h-screen">
        <div
          style={{
            padding: '3rem'
          }}
        >
          {this.props.children}
        </div>
        <div className="flex flex-grow" />
        <Footer />
      </div>
    )
  }
}
