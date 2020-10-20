'use strict'
import DefaultConn from '@etc/default.http'

require('mootools')

export default function () {
  return Object.merge(Object.clone(DefaultConn), { path: DefaultConn.path + 'signout' })
}
