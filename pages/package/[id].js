import React, { PureComponent } from 'react'
import withEnv from '../../api/withEnv'
import Layout from '../../components/Layout'
import JelbrekAPI from '../../api'
import Head from 'next/head'

import ReactMarkdown from 'react-markdown'
import moment from 'moment'

import '../../styles/index.css'
import initialize from '../../api/initialize'

const PKG_MANAGER_REGEX = /Cydia|Sileo|Zebra/gi

@withEnv
export default class Package extends PureComponent {
  static async getInitialProps({ isServer, req, store, env, query }) {
    initialize({ isServer, req, store })

    const api = new JelbrekAPI(env.ipAddress)
    const pkg = await api.getPackage(query.id)
    return {
      pkg
    }
  }
  render() {
    const { pkg } = this.props
    return (
      <Layout>
        <Head>
          <title>Jelbrek - {pkg.name}</title>
          <meta name="description" content={pkg.description} />
          <meta property="og:title" content={pkg.name} />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={'https://www.jelbrek.com/package/' + pkg.packageId}
          />
          <meta
            property="og:image"
            content={
              'https://repo.jelbrek.com/package/' + pkg.packageId + '/icon.png'
            }
          />
          <meta property="og:description" content={pkg.description} />
          <meta property="og:site_name" content="Jelbrek Repo" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@jelbrekrepo" />
          <meta name="twitter:title" content={pkg.name} />
          <meta name="twitter:description" content={pkg.description} />
          <meta name="twitter:creator" content="@jelbrekrepo" />
          <meta
            name="twitter:image"
            content={
              'https://repo.jelbrek.com/package/' + pkg.packageId + '/icon.png'
            }
          />
        </Head>

        <h1 className="text-gray-800 font-bold text-3xl">{pkg.name}</h1>
        <h2 className="text-gray-600 font-semibold text-xl">
          {pkg.description}
        </h2>
        {this.props.env.userAgent &&
          !this.props.env.userAgent.match(PKG_MANAGER_REGEX) && (
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-4">
              <a href={'cydia://package/' + pkg.packageId} target="_blank">
                View in Cydia
              </a>
            </button>
          )}

        <div className="my-4">
          <h3 className="text-gray-800 font-medium text-lg">Author</h3>
          <p className="text-black">{pkg.author.displayName}</p>
        </div>
        <div className="my-4 p-5">
          <ReactMarkdown source={pkg.depiction}></ReactMarkdown>
        </div>
        <div className="my-4 p-5">
          <h3 className="text-gray-800 font-medium text-lg">Changes</h3>
          {pkg.latestVersion && pkg.latestVersion.changes ? (
            <ReactMarkdown source={pkg.latestVersion.changes} />
          ) : (
            <span className="italic">
              No changes were specified for this version.
            </span>
          )}
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col my-4 mr-4">
            <h3 className="text-gray-800 font-medium text-lg">Created On</h3>
            <p className="text-black">
              {pkg.creationDate &&
                moment(pkg.creationDate).format('MMMM Do, YYYY')}
            </p>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col my-4 mr-4">
            <h3 className="text-gray-800 font-medium text-lg">Version</h3>
            <p className="text-black">
              {pkg.latestVersion && pkg.latestVersion.version}
            </p>
          </div>

          <div className="flex flex-col my-4 mr-4">
            <h3 className="text-gray-800 font-medium text-lg">Updated On</h3>
            <p className="text-black">
              {pkg.latestVersion &&
                moment(pkg.latestVersion.creationDate).format('MMMM Do, YYYY')}
            </p>
          </div>
        </div>
      </Layout>
    )
  }
}
