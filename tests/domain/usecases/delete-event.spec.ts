class DeleteEvent {
  // loadGroupRepository: LoadGroupRepository
  constructor (
    private readonly loadGroupRepository: LoadGroupRepository
  ) {}

  async perform (input: { id: string, userId: string}): Promise<void> {

  }
}

class LoadGroupRepository {
  eventId: string | undefined

//   constructor (id: string) {
//     this.eventId = id
//   }
}

describe('DeleteEvent', () => {
  it('Should get group data', async () => {
    // Crie a instancia da classe que sera testada
    // 3A - Arrange, Act, Assert (Organizar, agir, afirmar)
    const id = 'any_event_id'
    const userId = 'any_user_id'
    const loadGroupRepository = new LoadGroupRepository()
    const sut = new DeleteEvent(loadGroupRepository)

    await sut.perform({
      id,
      userId
    })

    expect(loadGroupRepository.eventId).toBe(id)
  })
})
