import React, { PureComponent } from 'react'
import withEnv from '../api/withEnv'
import Layout from '../components/Layout'
import JelbrekAPI from '../api'
import Head from 'next/head'

import { connect } from 'react-redux'

import PackageBox from '../components/PackageBox'

import '../styles/index.css'
import actions from '../redux/actions'
import initialize from '../api/initialize'

@withEnv
@connect(
  state => state,
  actions
)
export default class Index extends PureComponent {
  static async getInitialProps({ isServer, req, env, store }) {
    initialize({ isServer, req, store })
    const api = new JelbrekAPI(env.ipAddress)
    const packages = await api.getPackages()
    const featuredPackages = await api.getFeaturedPackages()
    return {
      packages,
      featuredPackages
    }
  }
  render() {
    return (
      <Layout>
        <Head>
          <title>Jelbrek</title>
          <meta
            name="description"
            content="Jelbrek is a Cydia repository to host jailbreak tweaks for developers."
          />

          <meta property="og:title" content="Jelbrek Repository" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.jelbrek.com/" />
          <meta
            property="og:description"
            content="Jelbrek is a Cydia repository to host jailbreak tweaks for developers."
          />
          <meta property="og:site_name" content="Jelbrek Repo" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@jelbrekrepo" />
          <meta name="twitter:title" content="Jelbrek Repository" />
          <meta
            name="twitter:description"
            content="Jelbrek is a Cydia repository to host jailbreak tweaks for developers."
          />
          <meta name="twitter:creator" content="@jelbrekrepo" />
        </Head>
        <div className="p-4 mb-4 shadow rounded bg-white">
          <h1 className="text-purple-600 text-4xl font-semibold">Jelbrek</h1>
          <p className="text-grey-dark mb-4">
            Welcome to the Jelbrek repository! Consider joining our Discord.
          </p>
          <button className="bg-transparent hover:bg-purple-600 text-gray-800 hover:text-white font-semibold py-2 px-4 border border-purple-700 rounded shadow uppercase tracking-wide mr-4">
            <a
              href="cydia://url/https://cydia.saurik.com/api/share#?source=https://repo.jelbrek.com"
              target="_blank"
            >
              Add to Cydia
            </a>
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-4">
            <a href="https://discord.gg/Vb5aJtu" target="_blank">
              Join the Discord
            </a>
          </button>
        </div>
        <h1 className="text-black font-semibold text-xl">Featured Packages</h1>
        <h2 className="text-gray-700">
          Packages featured by repo moderators or admins
        </h2>
        <div className="flex flex-row flex-wrap justify-between max-w-full">
          {this.props.featuredPackages.map(pkg => (
            <PackageBox key={pkg.id} package={pkg} featured={true} />
          ))}
        </div>
        <h2 className="text-black text-xl">Packages</h2>
        <h3 className="text-gray-700">All packages on the repository</h3>
        <div className="flex flex-row flex-wrap max-w-full">
          {this.props.packages.map(pkg => (
            <PackageBox key={pkg.id} package={pkg} featured={false} />
          ))}
        </div>
      </Layout>
    )
  }
}
