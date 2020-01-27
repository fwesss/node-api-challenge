import db from '../dbConfig'
import { actionToBody } from './mappers'

const get = id => {
  const query = db('actions')

  if (id) {
    return query
      .where('id', id)
      .first()
      .then(action => {
        if (action) {
          return actionToBody(action)
        }
        return null
      })
  }
  return query.then(actions => actions.map(action => actionToBody(action)))
}

const insert = action =>
  db('actions')
    .insert(action)
    .then(([id]) => this.get(id))

const update = (id, changes) =>
  db('actions')
    .where('id', id)
    .update(changes)
    .then(count => (count > 0 ? this.get(id) : null))

const remove = id =>
  db('actions')
    .where('id', id)
    .del()

export default {
  get,
  insert,
  update,
  remove,
}
