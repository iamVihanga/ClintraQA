import type { Access } from 'payload'

const editor: Access = ({ req: { user } }) => {
  if (user) {
    if (user.role === 'admin' || user.role === 'editor') return true
  }

  return false
}

export default editor
