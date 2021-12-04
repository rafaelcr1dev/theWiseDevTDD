import { Group } from '@/domain/models'

describe('Group', () => {
  it('Should return false if userId is invalid', () => {
    const group = new Group({ users: [{ id: 'any_user_id', permission: 'user' }] })

    const isAdmin = group.isAdmin('invalid_id')

    expect(isAdmin).toBe(false)
  })

  it('Should return false if permission is user', () => {
    const group = new Group({ users: [{ id: 'any_user_id', permission: 'user' }] })

    const isAdmin = group.isAdmin('any_user_id')

    expect(isAdmin).toBe(false)
  })

  it('Should return true if permission is admin', () => {
    const group = new Group({ users: [{ id: 'any_user_id', permission: 'admin' }] })

    const isAdmin = group.isAdmin('any_user_id')

    expect(isAdmin).toBe(true)
  })

  it('Should return true if permission is owner', () => {
    const group = new Group({ users: [{ id: 'any_user_id', permission: 'owner' }] })

    const isAdmin = group.isAdmin('any_user_id')

    expect(isAdmin).toBe(true)
  })
})
