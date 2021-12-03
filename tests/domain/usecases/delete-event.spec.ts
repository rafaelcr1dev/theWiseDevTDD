class DeleteEvent {
  // loadGroupRepository: LoadGroupRepository
  constructor (
    private readonly loadGroupRepository: ILoadGroupRepository,
    private readonly deleteEventRepository: IDeleteEventRepository
  ) {}

  async perform ({ id, userId }: { id: string, userId: string}): Promise<void> {
    const group = await this.loadGroupRepository.load({ eventId: id })
    if (group === undefined) throw new Error()
    if (group.users.find(user => user.id === userId) === undefined) throw new Error()
    if (group.users.find(user => user.id === userId)?.permission === 'user') throw new Error()
    await this.deleteEventRepository.delete({ id })
  }
}

interface ILoadGroupRepository {
  load: (input: {
    eventId: string
  }) => Promise<Group | undefined>
}

interface IDeleteEventRepository {
  delete: (input: {
    id: string
  }) => Promise<void>
}

/*
  Mock = Propriedades usadas para observar coisas (preocupacao com as entradas)
  Stub = Retorno fixo de uma funcao
  spy = Ambos
*/

type Group = {
  users: GroupUser[]
}

type GroupUser = {
  id: string
  permission: 'owner' | 'admin' | 'user'
}

class LoadGroupRepositorySpy implements ILoadGroupRepository {
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

class DeleteEventRepositoryMock implements IDeleteEventRepository {
  id?: string
  callsCount = 0

  async delete ({ id }: { id: string }): Promise<void> {
    this.id = id
    this.callsCount++
  }
}

type SutTypes = {
  sut: DeleteEvent
  loadGroupRepository: LoadGroupRepositorySpy
  deleteEventRepository: DeleteEventRepositoryMock
}

const makeSut = (): SutTypes => {
  const loadGroupRepository = new LoadGroupRepositorySpy()
  const deleteEventRepository = new DeleteEventRepositoryMock()
  const sut = new DeleteEvent(loadGroupRepository, deleteEventRepository)
  return {
    sut,
    loadGroupRepository,
    deleteEventRepository
  }
}

describe('DeleteEvent', () => {
  const id = 'any_event_id'
  const userId = 'any_user_id'

  it('Should get group data', async () => {
    // Crie a instancia da classe que sera testada
    // 3A - Arrange, Act, Assert (Organizar, agir, afirmar)
    const { sut, loadGroupRepository } = makeSut()

    await sut.perform({
      id,
      userId
    })

    expect(loadGroupRepository.eventId).toBe(id)
    expect(loadGroupRepository.callsCount).toBe(1)
  })

  it('Should throw if eventId is invalid', async () => {
    const { sut, loadGroupRepository } = makeSut()
    loadGroupRepository.output = undefined

    const promise = sut.perform({
      id,
      userId
    })

    await expect(promise).rejects.toThrowError()
  })

  it('Should throw if eventId is invalid', async () => {
    const { sut, loadGroupRepository } = makeSut()
    loadGroupRepository.output = {
      users: [
        { id: 'any_user_id', permission: 'admin' }
      ]
    }

    const promise = sut.perform({
      id,
      userId: 'invalid_id'
    })

    await expect(promise).rejects.toThrowError()
  })

  it('Should throw if permission is user', async () => {
    const { sut, loadGroupRepository } = makeSut()
    loadGroupRepository.output = {
      users: [
        { id: 'any_user_id', permission: 'user' }
      ]
    }

    const promise = sut.perform({
      id,
      userId
    })

    await expect(promise).rejects.toThrowError()
  })

  it('Should not throw if permission is admin', async () => {
    const { sut, loadGroupRepository } = makeSut()
    loadGroupRepository.output = {
      users: [
        { id: 'any_user_id', permission: 'admin' }
      ]
    }

    const promise = sut.perform({
      id,
      userId
    })

    await expect(promise).resolves.not.toThrowError()
  })

  it('Should not throw if permission is owner', async () => {
    const { sut, loadGroupRepository } = makeSut()
    loadGroupRepository.output = {
      users: [
        { id: 'any_user_id', permission: 'owner' }
      ]
    }

    const promise = sut.perform({
      id,
      userId
    })

    await expect(promise).resolves.not.toThrowError()
  })

  it('Should delete event', async () => {
    const { sut, deleteEventRepository } = makeSut()

    await sut.perform({
      id,
      userId
    })

    expect(deleteEventRepository.id).toBe(id)
    expect(deleteEventRepository.callsCount).toBe(1)
  })
})
