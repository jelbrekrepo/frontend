import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
@connect(state => ({
  isAuthenticated: !!state.authentication.user,
  ...state
}))
export default class Footer extends PureComponent {
  render() {
    return (
      <div className="p-12 bg-gray-300 flex flex-row flex-wrap">
        <div className="flex flex-col mr-16">
          <h1 className="text-xl font-medium">Jelbrek</h1>
          {this.props.isAuthenticated && (
            <span>Logged in as {this.props.authentication.user.username}</span>
          )}
          {!this.props.isAuthenticated && <span>Not logged in</span>}
        </div>
        <div className="flex flex-col mr-16">
          <h1 className="text-xl font-medium">Links</h1>
          {this.props.isAuthenticated && (
            <a href="/profile" className="text-blue-500 hover:text-blue-800">
              Profile
            </a>
          )}
          {this.props.isAuthenticated && (
            <a href="/logout" className="text-blue-500 hover:text-blue-800">
              Logout
            </a>
          )}
          {!this.props.isAuthenticated && (
            <a href="/login" className="text-blue-500 hover:text-blue-800">
              Login
            </a>
          )}
          {!this.props.isAuthenticated && (
            <a href="/register" className="text-blue-500 hover:text-blue-800">
              Sign Up
            </a>
          )}
        </div>
        {this.props.isAuthenticated &&
          this.props.authentication.user.developer && (
            <div className="flex flex-col mr-16">
              <h1 className="text-xl font-medium">Developer</h1>
              <a
                href="/developer"
                className="text-blue-500 hover:text-blue-800"
              >
                Developer Dashboard
              </a>
            </div>
          )}
        {this.props.isAuthenticated &&
          this.props.authentication.user.moderator && (
            <div className="flex flex-col mr-16">
              <h1 className="text-xl font-medium">Moderator</h1>
              <a
                href="/moderator"
                className="text-blue-500 hover:text-blue-800"
              >
                Moderator Dashboard
              </a>
            </div>
          )}
        {this.props.isAuthenticated && this.props.authentication.user.admin && (
          <div className="flex flex-col mr-16">
            <h1 className="text-xl font-medium">Administrator</h1>
            <a href="/admin" className="text-blue-500 hover:text-blue-800">
              Admin Dashboard
            </a>
          </div>
        )}
      </div>
    )
  }
}
