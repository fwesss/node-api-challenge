import express from 'express'
import Validation from 'folktale/validation'
import { validator, didItValidate } from '../../utils/validator'
import controllers from './actions.controllers'
import actions from './actions.model'
import projects from '../projects/projects.model'

const { Success } = Validation

const router = express.Router()

const hasBody = req => !!req.body
const hasProjectId = req => !!req.body.project_id
const hasDescription = req => !!req.body.description
const hasNotes = req => !!req.body.notes

const bodyValidator = validator('Missing post data', hasBody)
const projectIdValidator = validator('Missing project ID', hasProjectId)
const descriptionValidator = validator('Missing description', hasDescription)
const notesValidator = validator('Missing notes', hasNotes)

const actionValidationResult = req =>
  Success()
    .concat(bodyValidator(req))
    .concat(projectIdValidator(req))
    .concat(descriptionValidator(req))
    .concat(notesValidator(req))

const validateActionId = async (req, res, next) => {
  try {
    const action = await actions.get(req.params.id)
    if (action) {
      next()
    } else {
      res.status(400).json({ error: 'Invalid action ID' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Action information could not be retrieved' })
  }
}

const validateAction = async (req, res, next) => {
  const didActionValidate = didItValidate(actionValidationResult(req))

  if (!didActionValidate) {
    res.status(400).json({ errors: actionValidationResult(req).value })
  } else {
    try {
      const project = await projects.get(req.body.project_id)
      if (!project) {
        res.status(404).json({ error: 'Project does not exist' })
      } else {
        next()
      }
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ error: 'Project information could not be retrieved' })
    }
  }
}

router.use('/:id', validateActionId)

router
  .route('/')
  .get(controllers.getMany)
  .post(validateAction, controllers.createOne)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(validateAction, controllers.updateOne)
  .delete(controllers.removeOne)

export default router
