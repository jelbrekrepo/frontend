import React, { PureComponent } from 'react'
import JelbrekAPI from '../../api'
import Layout from '../../components/Layout'
import withEnv from '../../api/withEnv'
import Head from 'next/head'

import dynamic from 'next/dynamic'

import '../../styles/index.css'

const RegisterForm = dynamic(() => import('../../components/RegisterForm'), {
  ssr: false
})

@withEnv
export default class Register extends PureComponent {
  constructor(...args) {
    super(...args)
    this.onSubmit = this.onSubmit.bind(this)
  }
  static async getInitialProps() {
    return {}
  }
  async onSubmit(values, { setSubmitting, setErrors }) {
    let api = new JelbrekAPI(this.props.env.ipAddress)
    const res = await api.register(
      values.username,
      values.password,
      values.email
    )
    if (res.formikErrors) {
      setSubmitting(false)
      setErrors(res.formikErrors)
      return
    }
    setSubmitting(false)
    return (location.href = '/register/success')
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
          <title>Jelbrek - Register</title>
        </Head>
        <h1 className="text-black font-semibold text-xl">Sign Up</h1>
        <h2 className="text-gray-700">Sign up for the Jelbrek repository</h2>
        <RegisterForm onSubmit={this.onSubmit} getClass={this.getClass} />
      </Layout>
    )
  }
}
