import React, { PureComponent } from 'react'

import { Formik } from 'formik'

export default class DeveloperPackageIconForm extends PureComponent {
  render() {
    return (
      <Formik
        initialValues={{
          file: null
        }}
        validate={values => {
          let errors = {}
          if (!values.file) {
            errors.file = 'Required'
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
          isSubmitting,
          setFieldValue
        }) => (
          <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="file"
              >
                Icon
              </label>
              <input
                id="file"
                name="file"
                type="file"
                onChange={event => {
                  setFieldValue('file', event.currentTarget.files[0])
                }}
              />
              {errors.file && touched.file && (
                <p className="text-red-500 text-xs italic">{errors.file}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isSubmitting}
              >
                Upload Icon
              </button>
            </div>
          </form>
        )}
      </Formik>
    )
  }
}
