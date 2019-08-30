import React, { PureComponent } from 'react'
import withEnv from '../../../../api/withEnv'
import Layout from '../../../../components/Layout'
import JelbrekAPI from '../../../../api'
import Head from 'next/head'

import dynamic from 'next/dynamic'

import '../../../../styles/index.css'
import initialize from '../../../../api/initialize'

const DeveloperPackageForm = dynamic(
  () => import('../../../../components/DeveloperPackageForm'),
  {
    ssr: false
  }
)
const DeveloperPackageIconForm = dynamic(
  () => import('../../../../components/DeveloperPackageIconForm'),
  {
    ssr: false
  }
)
const DeveloperPackageCreateVersionForm = dynamic(
  () => import('../../../../components/DeveloperPackageCreateVersionForm'),
  {
    ssr: false
  }
)

@withEnv
export default class DeveloperPackage extends PureComponent {
  constructor(...args) {
    super(...args)
    this.onSubmit = this.onSubmit.bind(this)
    this.onVersionSubmit = this.onVersionSubmit.bind(this)
    this.onIconSubmit = this.onIconSubmit.bind(this)
  }
  static async getInitialProps({ isServer, req, store, env, query }) {
    initialize({ isServer, req, store })

    const api = new JelbrekAPI(env.ipAddress)
    const pkg = await api.getPackage(query.id)
    return {
      pkg
    }
  }
  async onSubmit(values, { setSubmitting, setErrors }) {
    let api = new JelbrekAPI(
      this.props.env.ipAddress,
      this.props.env.cookies.token
    )
    const res = await api.editPackage(this.props.pkg.id, values)
    if (res.formikErrors) {
      setSubmitting(false)
      setErrors(res.formikErrors)
      return
    }
    setSubmitting(false)
    return (location.href = `/developer/package/${this.props.pkg.id}`)
  }
  getClass(errors, touched, name) {
    const base =
      'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    if (errors[name] && touched[name]) {
      return `${base} border-red-500`
    }
    return base
  }
  async onVersionSubmit(values, { setSubmitting, setErrors }) {
    let api = new JelbrekAPI(
      this.props.env.ipAddress,
      this.props.env.cookies.token
    )
    const res = await api.createVersion(this.props.pkg.id, values.version)
    if (res.formikErrors) {
      setSubmitting(false)
      setErrors(res.formikErrors)
      return
    }
    setSubmitting(false)
    return (location.href = `/developer/package/${this.props.pkg.id}/versions/${res.version.id}`)
  }
  async onIconSubmit(values, { setSubmitting, setErrors }) {
    let api = new JelbrekAPI(
      this.props.env.ipAddress,
      this.props.env.cookies.token
    )
    const res = await api.uploadPackageIcon(this.props.pkg.id, values.file)
    if (res.formikErrors) {
      setSubmitting(false)
      setErrors(res.formikErrors)
      return
    }
    setSubmitting(false)
    return (location.href = `/developer/package/${this.props.pkg.id}`)
  }
  render() {
    const { pkg } = this.props
    const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

    return (
      <Layout>
        <Head>
          <title>Jelbrek - Editing {pkg.name}</title>
        </Head>

        <h1 className="text-gray-800 font-bold text-3xl">{pkg.name}</h1>
        <h2 className="text-gray-600 font-semibold text-xl">
          {pkg.description}
        </h2>
        <DeveloperPackageForm
          pkg={pkg}
          onSubmit={this.onSubmit}
          getClass={this.getClass}
        />

        <h2 className="text-gray-600 font-semibold text-xl">Submit Icon</h2>
        <h3 className="text-gray-800 font-medium text-lg">Current Icon:</h3>
        <img
          src={`${BASE_URL}/package/${pkg.id}/icon.png`}
          style={{
            width: '120px',
            height: '120px'
          }}
        ></img>
        <DeveloperPackageIconForm
          pkg={pkg}
          onSubmit={this.onIconSubmit}
          getClass={this.getClass}
        />

        <h2 className="text-gray-600 font-semibold text-xl">Edit versions</h2>
        <div class="flex flex-col max-w-xs">
          {pkg.versions.map(version => (
            <a
              key={version.id}
              href={`/developer/package/${pkg.id}/versions/${version.id}`}
              className="text-blue-500 hover:text-blue-800"
            >
              {version.version}
            </a>
          ))}
        </div>

        <h2 className="text-gray-600 font-semibold text-xl">Create Version</h2>
        <DeveloperPackageCreateVersionForm
          onSubmit={this.onVersionSubmit}
          getClass={this.getClass}
        />
      </Layout>
    )
  }
}
