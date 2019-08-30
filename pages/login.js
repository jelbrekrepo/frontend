import React, { PureComponent } from 'react'
import withEnv from '../api/withEnv'
import Layout from '../components/Layout'
import JelbrekAPI from '../api'

import jsCookie from 'js-cookie'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import Router from 'next/router'
import actions from '../redux/actions'
import Head from 'next/head'

import '../styles/index.css'

const LoginForm = dynamic(() => import('../components/LoginForm'), {
  ssr: false
})

@withEnv
@connect(
  state => state,
  actions
)
export default class Login extends PureComponent {
  constructor(...args) {
    super(...args)
    this.onSubmit = this.onSubmit.bind(this)
  }
  async onSubmit(values, { setSubmitting, setErrors }) {
    let api = new JelbrekAPI(this.props.env.ipAddress)
    const res = await api.login(values.username, values.password)
    if (res.formikErrors) {
      setSubmitting(false)
      setErrors(res.formikErrors)
      return
    }
    setSubmitting(false)
    jsCookie.set('token', res.token)
    this.props.authenticate(res.token)

    return Router.push('/')
  }
  getClass(errors, touched, name) {
    const base =
      'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    if (errors[name] && touched[name]) {
      return `${base} border-red-500`
    }
    return base
  }
  render() {
    return (
      <Layout>
        <Head>
          <title>Jelbrek - Login</title>
        </Head>
        <h1 className="text-black font-semibold text-xl">Sign In</h1>
        <h2 className="text-gray-700">Login to the Jelbrek repository</h2>
        <LoginForm onSubmit={this.onSubmit} getClass={this.getClass} />
      </Layout>
    )
  }
}
