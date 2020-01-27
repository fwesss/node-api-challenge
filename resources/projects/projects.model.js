import db from '../../data/dbConfig'
import { projectToBody, actionToBody } from '../../data/helpers/mappers'

export function getProjectActions(projectId) {
  return db('actions')
    .where('project_id', projectId)
    .then(actions => actions.map(action => actionToBody(action)))
}

export const get = id => {
  const query = db('projects as p')

  if (id) {
    query.where('p.id', id).first()

    const promises = [query, getProjectActions(id)] // [ projects, actions ]

    return Promise.all(promises).then(function(results) {
      const [project, actions] = results

      if (project) {
        project.actions = actions

        return projectToBody(project)
      }
      return null
    })
  }
  return query.then(projects => projects.map(project => projectToBody(project)))
}

export function insert(project) {
  return db('projects')
    .insert(project, 'id')
    .then(([id]) => this.get(id))
}

export function update(id, changes) {
  return db('projects')
    .where('id', id)
    .update(changes)
    .then(count => (count > 0 ? this.get(id) : null))
}

export function remove(id) {
  return db('projects')
    .where('id', id)
    .del()
}

export default {
  get,
  insert,
  update,
  remove,
  getProjectActions,
}
