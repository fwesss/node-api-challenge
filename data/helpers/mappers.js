const intToBoolean = int => int === 1

const booleanToint = bool => (bool === true ? 1 : 0)

const projectToBody = project => {
  const result = {
    ...project,
    completed: intToBoolean(project.completed),
  }

  if (project.actions) {
    result.actions = project.actions.map(action => ({
      ...action,
      completed: intToBoolean(action.completed),
    }))
  }

  return result
}

const actionToBody = action => ({
  ...action,
  completed: intToBoolean(action.completed),
})

export default {
  intToBoolean,
  booleanToint,
  projectToBody,
  actionToBody,
}
