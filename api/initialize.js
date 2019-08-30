import actions from '../redux/actions'
import jsHttpCookie from 'cookie'

export default function initialize(ctx) {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      const cookiesJSON = jsHttpCookie.parse(ctx.req.headers.cookie)
      if (cookiesJSON.token) {
        ctx.store.dispatch(actions.authenticate(cookiesJSON.token))
      }
    }
  }
}
