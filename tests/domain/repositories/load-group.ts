import { Group } from '@/domain/models'
import { ILoadGroupRepository } from '@/domain/repositories'

export class LoadGroupRepositorySpy implements ILoadGroupRepository {
  eventId?: string
  callsCount = 0
  output?: Group = {
    users: [
      { id: 'any_user_id', permission: 'admin' }
    ]
  }
  // eventId: string | undefined

  //   constructor (id: string) {
  //     this.eventId = id
  //
  async load ({ eventId }: { eventId: string }): Promise<Group | undefined> {
    this.eventId = eventId
    this.callsCount++
    return this.output
  }
}
