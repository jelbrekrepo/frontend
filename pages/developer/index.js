import React, { PureComponent } from 'react'
import Layout from '../../components/Layout'
import withEnv from '../../api/withEnv'
import Head from 'next/head'

import '../../styles/index.css'

@withEnv
export default class DeveloperIndex extends PureComponent {
  render() {
    return (
      <Layout>
        <Head>
          <title>Jelbrek - Developer Dashboard</title>
        </Head>
        <h1 className="text-black font-semibold text-xl">
          Developer Dashboard
        </h1>
        <h2 className="text-gray-700">
          Your registration was a success! Check your email.
        </h2>
      </Layout>
    )
  }
}
