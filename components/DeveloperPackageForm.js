import React, { PureComponent } from 'react'

import { Formik } from 'formik'

export default class DeveloperPackageForm extends PureComponent {
  render() {
    return (
      <Formik
        initialValues={{
          section: this.props.pkg.section || '',
          latestVersion: this.props.pkg.latestVersion
            ? this.props.pkg.latestVersion.id
            : '',
          depiction: this.props.pkg.depiction || '',
          description: this.props.pkg.description || ''
        }}
        validate={values => {
          let errors = {}
          if (!values.section) {
            errors.section = 'Required'
          }
          if (!values.depiction) {
            errors.depiction = 'Required'
          }
          if (!values.description) {
            errors.description = 'Required'
          }
          return errors
        }}
        onSubmit={this.props.onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="section"
              >
                Section
              </label>
              <input
                className={this.props.getClass(errors, touched, 'section')}
                id="section"
                name="section"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.section}
                placeholder="Section"
              />
              {errors.section && touched.section && (
                <p className="text-red-500 text-xs italic">{errors.section}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="latestVersion"
              >
                Latest Version
              </label>
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                id="latestVersion"
                name="latestVersion"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.latestVersion}
              >
                {this.props.pkg.versions.map(version => (
                  <option key={version.id} value={version.id}>
                    {version.version}
                  </option>
                ))}
              </select>
              {errors.latestVersion && touched.latestVersion && (
                <p className="text-red-500 text-xs italic">
                  {errors.latestVersion}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <input
                className={this.props.getClass(errors, touched, 'description')}
                id="description"
                name="description"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                placeholder="Description"
              />
              {errors.description && touched.description && (
                <p className="text-red-500 text-xs italic">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="depiction"
              >
                Depiction
              </label>
              <textarea
                className={this.props.getClass(errors, touched, 'depiction')}
                id="depiction"
                name="depiction"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.depiction}
                placeholder="Depiction"
                rows={16}
              />
              {errors.depiction && touched.depiction && (
                <p className="text-red-500 text-xs italic">
                  {errors.depiction}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isSubmitting}
              >
                Update
              </button>
            </div>
          </form>
        )}
      </Formik>
    )
  }
}
