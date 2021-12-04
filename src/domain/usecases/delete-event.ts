import { IDeleteEventRepository, IDeleteMatchRepository, ILoadGroupRepository } from '../repositories'

export class DeleteEvent {
  // loadGroupRepository: LoadGroupRepository
  constructor (
    private readonly loadGroupRepository: ILoadGroupRepository,
    private readonly deleteEventRepository: IDeleteEventRepository,
    private readonly deleteMatchRepository: IDeleteMatchRepository
  ) {}

  async perform ({ id, userId }: { id: string, userId: string}): Promise<void> {
    const group = await this.loadGroupRepository.load({ eventId: id })
    if (group === undefined) throw new Error()
    if (group.users.find(user => user.id === userId) === undefined) throw new Error()
    if (group.users.find(user => user.id === userId)?.permission === 'user') throw new Error()
    await this.deleteEventRepository.delete({ id })
    await this.deleteMatchRepository.delete({ eventId: id })
  }
}
