import React, { PureComponent } from 'react'
import withEnv from '../../../../../api/withEnv'
import Layout from '../../../../../components/Layout'
import JelbrekAPI from '../../../../../api'
import Head from 'next/head'

import dynamic from 'next/dynamic'

import '../../../../../styles/index.css'
import initialize from '../../../../../api/initialize'

const DeveloperPackageVersionForm = dynamic(
  () => import('../../../../../components/DeveloperPackageVersionForm'),
  {
    ssr: false
  }
)
const DeveloperPackageVersionUploadForm = dynamic(
  () => import('../../../../../components/DeveloperPackageVersionUploadForm'),
  {
    ssr: false
  }
)

@withEnv
export default class DeveloperPackageVersion extends PureComponent {
  constructor(...args) {
    super(...args)
    this.onSubmit = this.onSubmit.bind(this)
    this.onPackageSubmit = this.onPackageSubmit.bind(this)
  }
  static async getInitialProps({ isServer, req, store, env, query }) {
    initialize({ isServer, req, store })

    const api = new JelbrekAPI(env.ipAddress)
    const pkg = await api.getPackage(query.id)
    const version = await api.getPackageVersion(pkg.id, query.version)
    return {
      pkg,
      version
    }
  }
  async onSubmit(values, { setSubmitting, setErrors }) {
    let api = new JelbrekAPI(
      this.props.env.ipAddress,
      this.props.env.cookies.token
    )
    const res = await api.editVersion(
      this.props.pkg.id,
      this.props.version.id,
      values
    )
    if (res.formikErrors) {
      setSubmitting(false)
      setErrors(res.formikErrors)
      return
    }
    setSubmitting(false)
    return (location.href = `/developer/package/${this.props.pkg.id}/versions/${this.props.version.id}`)
  }
  async onPackageSubmit(values, { setSubmitting, setErrors }) {
    let api = new JelbrekAPI(
      this.props.env.ipAddress,
      this.props.env.cookies.token
    )
    const res = await api.uploadPackageVersion(
      this.props.pkg.id,
      this.props.version.id,
      values.file
    )
    if (res.formikErrors) {
      setSubmitting(false)
      setErrors(res.formikErrors)
      return
    }
    setSubmitting(false)
    return (location.href = `/developer/package/${this.props.pkg.id}/versions/${this.props.version.id}`)
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
    const { pkg, version } = this.props
    return (
      <Layout>
        <Head>
          <title>
            Jelbrek - Editing {pkg.name}'s version {version.version}
          </title>
        </Head>

        <h1 className="text-gray-800 font-bold text-3xl">{pkg.name}</h1>
        <h2 className="text-gray-600 font-semibold text-xl">
          Editing version {version.version}
        </h2>
        <DeveloperPackageVersionForm
          pkg={pkg}
          version={version}
          onSubmit={this.onSubmit}
          getClass={this.getClass}
        />
        <h2 className="text-gray-600 font-semibold text-xl">Upload Package</h2>
        {version.size && (
          <h3 className="text-red-500 font-medium text-xl">
            You have already uploaded a deb, be careful!
          </h3>
        )}

        <DeveloperPackageVersionUploadForm
          pkg={pkg}
          version={version}
          onSubmit={this.onPackageSubmit}
          getClass={this.getClass}
        />
      </Layout>
    )
  }
}
