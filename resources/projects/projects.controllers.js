import { crudControllers } from '../../utils/crud'
import Projects, { getProjectActions } from './projects.model'

const getManyProjectActions = async (req, res) => {
  try {
    const actions = await getProjectActions(req.params.id)
    res.status(200).json(actions)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'The information could not be retrieved.' })
  }
}

export default { ...crudControllers(Projects), getManyProjectActions }
