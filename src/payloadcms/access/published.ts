import type { Access } from 'payload'

export const published: Access = ({ req: { user } }) => {
  if (user && (user.role === 'admin' || user.role === 'editor')) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
