class DeleteEvent {
  // loadGroupRepository: LoadGroupRepository
  constructor (
    private readonly loadGroupRepository: ILoadGroupRepository
  ) {}

  async perform ({ id }: { id: string, userId: string}): Promise<void> {
    await this.loadGroupRepository.load({ eventId: id })
  }
}

interface ILoadGroupRepository {
  load: (input: {
    eventId: string
  }) => Promise<void>
}
/*
  Mock = Propriedades usadas para observar coisas (preucupacao com as entradas)
  Stub = Retorno fixo de uma funcao
*/
class LoadGroupRepositoryMock implements ILoadGroupRepository {
  eventId?: string
  callsCount = 0
  // eventId: string | undefined

  //   constructor (id: string) {
  //     this.eventId = id
  //
  async load ({ eventId }: { eventId: string }): Promise<void> {
    this.eventId = eventId
    this.callsCount++
  }
}

type SutTypes = {
  sut: DeleteEvent
  loadGroupRepository: LoadGroupRepositoryMock
}

const makeSut = (): SutTypes => {
  const loadGroupRepository = new LoadGroupRepositoryMock()
  const sut = new DeleteEvent(loadGroupRepository)
  return {
    sut,
    loadGroupRepository
  }
}

describe('DeleteEvent', () => {
  it('Should get group data', async () => {
    // Crie a instancia da classe que sera testada
    // 3A - Arrange, Act, Assert (Organizar, agir, afirmar)
    const id = 'any_event_id'
    const userId = 'any_user_id'
    const { sut, loadGroupRepository } = makeSut()

    await sut.perform({
      id,
      userId
    })

    expect(loadGroupRepository.eventId).toBe(id)
    expect(loadGroupRepository.callsCount).toBe(1)
  })
})
