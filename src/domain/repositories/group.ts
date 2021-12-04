import { Group } from '../models'

export interface ILoadGroupRepository {
  load: (input: {
    eventId: string
  }) => Promise<Group | undefined>
}
