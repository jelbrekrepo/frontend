import React, { PureComponent } from 'react'

import { Formik } from 'formik'

export default class DeveloperPackageForm extends PureComponent {
  render() {
    return (
      <Formik
        initialValues={{
          changes: this.props.version.changes || '',
          minimumVersion: this.props.version.minimumVersion || '',
          maximumVersion: this.props.version.maximumVersion || ''
        }}
        validate={values => {
          let errors = {}
          if (!values.changes) {
            errors.changes = 'Required'
          }
          if (!values.minimumVersion) {
            errors.minimumVersion = 'Required'
          }
          if (!values.maximumVersion) {
            errors.maximumVersion = 'Required'
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
                htmlFor="minimumVersion"
              >
                Minimum iOS Version
              </label>
              <input
                className={this.props.getClass(
                  errors,
                  touched,
                  'minimumVersion'
                )}
                id="minimumVersion"
                name="minimumVersion"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.minimumVersion}
                placeholder="11.0"
              />
              {errors.minimumVersion && touched.minimumVersion && (
                <p className="text-red-500 text-xs italic">
                  {errors.minimumVersion}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="maximumVersion"
              >
                Max iOS Version
              </label>
              <input
                className={this.props.getClass(
                  errors,
                  touched,
                  'maximumVersion'
                )}
                id="maximumVersion"
                name="maximumVersion"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.maximumVersion}
                placeholder="12.4"
              />
              {errors.maximumVersion && touched.maximumVersion && (
                <p className="text-red-500 text-xs italic">
                  {errors.maximumVersion}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="changes"
              >
                Changes
              </label>
              <textarea
                className={this.props.getClass(errors, touched, 'changes')}
                id="changes"
                name="changes"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.changes}
                placeholder="Changes"
                rows={16}
              />
              {errors.changes && touched.changes && (
                <p className="text-red-500 text-xs italic">{errors.changes}</p>
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
