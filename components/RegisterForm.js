import React, { PureComponent } from 'react'

import { Formik } from 'formik'

export default class RegisterForm extends PureComponent {
  render() {
    return (
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validate={values => {
          let errors = {}
          if (!values.username) {
            errors.username = 'Required'
          }
          if (!values.email) {
            errors.email = 'Required'
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address'
          }
          if (!values.password) {
            errors.password = 'Required'
          } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Passwords do not match'
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
                htmlFor="username"
              >
                Username
              </label>
              <input
                className={this.props.getClass(errors, touched, 'username')}
                id="username"
                name="username"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                placeholder="Username"
              />
              {errors.username && touched.username && (
                <p className="text-red-500 text-xs italic">{errors.username}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={this.props.getClass(errors, touched, 'email')}
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={this.props.getClass(errors, touched, 'password')}
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="******************"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className={this.props.getClass(
                  errors,
                  touched,
                  'confirmPassword'
                )}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                placeholder="******************"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 text-xs italic">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isSubmitting}
              >
                Sign Up
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="/login"
              >
                Already have an account?
              </a>
            </div>
          </form>
        )}
      </Formik>
    )
  }
}
