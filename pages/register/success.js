import React, { PureComponent } from 'react'
import Layout from '../../components/Layout'
import withEnv from '../../api/withEnv'
import Head from 'next/head'

import '../../styles/index.css'

@withEnv
export default class RegisterSuccess extends PureComponent {
  render() {
    return (
      <Layout>
        <Head>
          <title>Jelbrek - Registration Success</title>
        </Head>
        <h1 className="text-black font-semibold text-xl">Sign Up</h1>
        <h2 className="text-gray-700">
          Your registration was a success! Check your email.
        </h2>
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-4">
          <a href="/">Go Home</a>
        </button>
      </Layout>
    )
  }
}
