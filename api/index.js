import fetch from 'isomorphic-unfetch'
import jsHttpCookie from 'cookie'
export default class JelbrekAPI {
  BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
  constructor(ip, req) {
    this.ip = ip
    if (req && req.headers) {
      const cookies = req.headers.cookie
      if (typeof cookies === 'string') {
        const cookiesJSON = jsHttpCookie.parse(cookies)
        if (cookiesJSON.token) {
          this.token = cookiesJSON.token
        }
      }
    } else if (req && req.getState) {
      let state = req.getState()
      this.token = state.authentication.token
    } else if (typeof req === 'string') {
      this.token = req
    }
  }

  async getPackages() {
    const res = await fetch(`${this.BASE_URL}/package`, {
      credentials: 'include',
      headers: {
        Authorization: this.token,
        'X-Forwarded-For': this.ip
      }
    })
    const json = await res.json()
    return json.packages
  }
  async getFeaturedPackages() {
    const res = await fetch(`${this.BASE_URL}/package/featured`, {
      credentials: 'include',
      headers: {
        Authorization: this.token,
        'X-Forwarded-For': this.ip
      }
    })
    const json = await res.json()
    return json.packages
  }

  async getPackage(id) {
    const res = await fetch(`${this.BASE_URL}/package/${id}`, {
      credentials: 'include',
      headers: {
        Authorization: this.token,
        'X-Forwarded-For': this.ip
      }
    })
    const json = await res.json()
    return json.package
  }
  async getPackageVersion(id, version) {
    const res = await fetch(
      `${this.BASE_URL}/package/${id}/versions/${version}`,
      {
        credentials: 'include',
        headers: {
          Authorization: this.token,
          'X-Forwarded-For': this.ip
        }
      }
    )
    const json = await res.json()
    return json.version
  }

  async register(username, password, email) {
    const res = await fetch(`${this.BASE_URL}/auth/register`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': this.ip
      },
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email
      })
    })
    const json = await res.json()
    return json
  }
  async login(username, password) {
    const res = await fetch(`${this.BASE_URL}/auth/login`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': this.ip
      },
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      })
    })
    const json = await res.json()
    return json
  }
  async verify(token) {
    const res = await fetch(`${this.BASE_URL}/auth/verify?token=${token}`, {
      credentials: 'include',
      headers: {
        Authorization: this.token,
        'X-Forwarded-For': this.ip
      }
    })
    const json = await res.json()
    return json
  }
  async uploadPackageIcon(pkg, file) {
    let formData = new FormData()
    formData.append('file', file)
    const res = await fetch(`${this.BASE_URL}/package/${pkg}/icon`, {
      credentials: 'include',
      headers: {
        Authorization: this.token,
        'X-Forwarded-For': this.ip
      },
      method: 'POST',
      body: formData
    })
    const json = await res.json()
    return json
  }
  async uploadPackageVersion(pkg, version, file) {
    let formData = new FormData()
    formData.append('file', file)
    const res = await fetch(
      `${this.BASE_URL}/package/${pkg}/versions/${version}/upload`,
      {
        credentials: 'include',
        headers: {
          Authorization: this.token,
          'X-Forwarded-For': this.ip
        },
        method: 'POST',
        body: formData
      }
    )
    const json = await res.json()
    return json
  }
  async editPackage(pkg, values) {
    if (typeof values.latestVersion !== 'string') {
      values.latestVersion = values.latestVersion.id
    }
    const res = await fetch(`${this.BASE_URL}/package/${pkg}`, {
      credentials: 'include',
      headers: {
        Authorization: this.token,
        'Content-Type': 'application/json',
        'X-Forwarded-For': this.ip
      },
      method: 'PATCH',
      body: JSON.stringify(values)
    })
    const json = await res.json()
    return json
  }
  async createVersion(pkg, version) {
    const res = await fetch(
      `${this.BASE_URL}/package/${pkg}/versions/${version}`,
      {
        credentials: 'include',
        headers: {
          Authorization: this.token,
          'X-Forwarded-For': this.ip
        },
        method: 'PUT'
      }
    )
    const json = await res.json()
    return json
  }
  async editVersion(pkg, version, values) {
    const res = await fetch(
      `${this.BASE_URL}/package/${pkg}/versions/${version}`,
      {
        credentials: 'include',
        headers: {
          Authorization: this.token,
          'Content-Type': 'application/json',
          'X-Forwarded-For': this.ip
        },
        method: 'PATCH',
        body: JSON.stringify(values)
      }
    )
    const json = await res.json()
    return json
  }
}
