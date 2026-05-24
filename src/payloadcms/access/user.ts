import type { Access } from 'payload'

const user: Access = ({ req: { user } }) => {
  if (user) {
    if (user.role === 'admin' || user.role === 'editor') return true

    return { id: { equals: user?.id } }
  }

  return false
}

export default user
