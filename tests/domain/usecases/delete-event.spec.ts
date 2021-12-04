import { DeleteEvent } from '@/domain/usecases'
import { DeleteEventRepositoryMock, DeleteMatchRepositoryMock, LoadGroupRepositorySpy } from '@/tests/domain/repositories'

/*
  Mock = Propriedades usadas para observar coisas (preocupacao com as entradas)
  Stub = Retorno fixo de uma funcao
  spy = Ambos
*/

type SutTypes = {
  sut: DeleteEvent
  loadGroupRepository: LoadGroupRepositorySpy
  deleteEventRepository: DeleteEventRepositoryMock
  deleteMatchRepository: DeleteMatchRepositoryMock
}

const makeSut = (): SutTypes => {
  const loadGroupRepository = new LoadGroupRepositorySpy()
  const deleteEventRepository = new DeleteEventRepositoryMock()
  const deleteMatchRepository = new DeleteMatchRepositoryMock()
  const sut = new DeleteEvent(loadGroupRepository, deleteEventRepository, deleteMatchRepository)
  return {
    sut,
    loadGroupRepository,
    deleteEventRepository,
    deleteMatchRepository
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

  it('Should delete matches', async () => {
    const { sut, deleteMatchRepository } = makeSut()

    await sut.perform({
      id,
      userId
    })

    expect(deleteMatchRepository.eventId).toBe(id)
    expect(deleteMatchRepository.callsCount).toBe(1)
  })
})
