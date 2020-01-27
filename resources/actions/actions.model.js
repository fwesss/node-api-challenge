import db from '../../data/dbConfig'
import { actionToBody } from '../../data/helpers/mappers'

function get(id) {
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

function insert(action) {
  return db('actions')
    .insert(action)
    .then(([id]) => this.get(id))
}

function update(id, changes) {
  return db('actions')
    .where('id', id)
    .update(changes)
    .then(count => (count > 0 ? this.get(id) : null))
}

function remove(id) {
  return db('actions')
    .where('id', id)
    .del()
}

export default {
  get,
  insert,
  update,
  remove,
}
