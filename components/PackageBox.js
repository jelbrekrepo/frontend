import React, { PureComponent } from 'react'
import Link from 'next/link'
export default class PackageBox extends PureComponent {
  render() {
    const { package: pkg, featured } = this.props
    if (featured) {
      return (
        <div className="flex flex-col flex-grow max-w-lg rounded overflow-hidden shadow-lg hover:shadow-xl mb-4 mr-4 ml-4">
          <a href={`/package/${pkg.packageId}`}>
            <div className="px-5 py-4">
              <h1 className="text-gray-800 font-semibold text-lg">
                {pkg.name}
              </h1>
              <h2 className="text-gray-600 font-medium">{pkg.description}</h2>
            </div>
            <div className="px-5 py-4">
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-4">
                <a href={'cydia://package/' + pkg.packageId} target="_blank">
                  View in Cydia
                </a>
              </button>
            </div>
          </a>
        </div>
      )
    }
    return (
      <div className="flex flex-col flex-grow max-w-xs rounded overflow-hidden border border-gray-300 hover:shadow-xl m-4">
        <a href={`/package/${pkg.packageId}`}>
          <div className="px-5 py-4">
            <h1 className="text-gray-800 font-semibold text-lg">{pkg.name}</h1>
            <h2 className="text-gray-600 font-medium">{pkg.description}</h2>
          </div>
        </a>
      </div>
    )
  }
}
