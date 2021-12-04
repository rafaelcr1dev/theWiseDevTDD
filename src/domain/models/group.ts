import { GroupUser, Permission } from '@/domain/models'

export class Group {
  readonly users: GroupUser[]

  constructor ({ users }: { users: [{ id: string, permission: Permission }] }) {
    this.users = users.map(user => new GroupUser(user))
  }

  private findUser (userId: string): GroupUser | undefined {
    return this.users.find(user => user.id === userId)
  }

  isAdmin (userId: string): boolean {
    return Boolean(this.findUser(userId)?.isAdmin())
  }
}
