import React, { PureComponent } from 'react'
import withEnv from '../../api/withEnv'
import Layout from '../../components/Layout'
import JelbrekAPI from '../../api'
import Head from 'next/head'

import { Formik } from 'formik'

import '../../styles/index.css'

@withEnv
export default class Verify extends PureComponent {
  static async getInitialProps({ req, env, query }) {
    let api = new JelbrekAPI(env.ipAddress)
    let res = await api.verify(query.token)
    return { ...res }
  }
  render() {
    return (
      <Layout>
        <Head>
          <title>Jelbrek - Email Verification</title>
        </Head>
        <h1 className="text-black font-semibold text-xl">Email Verification</h1>
        <h2 className="text-gray-700">
          {this.props.errors ? this.props.errors[0] : this.props.message}
        </h2>
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-4">
          <a href="/">Go Home</a>
        </button>
      </Layout>
    )
  }
}
