export interface IDeleteMatchRepository {
  delete: (eventId: {
    eventId: string
  }) => Promise<void>
}
