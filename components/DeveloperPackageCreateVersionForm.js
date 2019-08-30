import React, { PureComponent } from 'react'

import { Formik } from 'formik'

export default class DeveloperPackageCreateVersionForm extends PureComponent {
  render() {
    return (
      <Formik
        initialValues={{
          version: ''
        }}
        validate={values => {
          let errors = {}
          if (!values.version) {
            errors.version = 'Required'
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
                htmlFor="version"
              >
                Version
              </label>
              <input
                className={this.props.getClass(errors, touched, 'version')}
                id="version"
                name="version"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.section}
                placeholder="Version"
              />
              {errors.version && touched.version && (
                <p className="text-red-500 text-xs italic">{errors.version}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isSubmitting}
              >
                Create Version
              </button>
            </div>
          </form>
        )}
      </Formik>
    )
  }
}
