import type { Access } from 'payload'

const admin: Access = ({ req: { user } }) => {
  if (user && user.role == 'admin') {
    return true
  }

  return false
}

export default admin
