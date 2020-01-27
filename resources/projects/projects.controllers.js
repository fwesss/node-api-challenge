import { crudControllers } from '../../utils/crud'
import Projects, { getProjectActions } from './projects.model'

const getManyProjectActions = async (req, res) => {
  try {
    const actions = await getProjectActions(req.params.id)
    if (actions.length) {
      res.status(200).json(actions)
    } else {
      res
        .status(404)
        .json({ message: 'There are no actions associated with this project' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'The information could not be retrieved.' })
  }
}

export default { ...crudControllers(Projects), getManyProjectActions }
