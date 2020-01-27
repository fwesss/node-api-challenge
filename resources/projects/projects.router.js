import express from 'express'
import Validation from 'folktale/validation'
import { validator, didItValidate } from '../../utils/validator'
import controllers from './projects.controllers'
import projects from './projects.model'

const { Success } = Validation

const router = express.Router()

const hasBody = req => !!req.body
const hasName = req => !!req.body.name
const hasDescription = req => !!req.body.description

const bodyValidator = validator('Missing post data', hasBody)
const nameValidator = validator('Missing project ID', hasName)
const descriptionValidator = validator('Missing description', hasDescription)

const projectValidationResult = req =>
  Success()
    .concat(bodyValidator(req))
    .concat(nameValidator(req))
    .concat(descriptionValidator(req))

const validateProject = async (req, res, next) => {
  const didProjectValidate = didItValidate(projectValidationResult(req))
  if (!didProjectValidate) {
    res.status(400).json({ errors: projectValidationResult(req).value })
  } else {
    next()
  }
}
const validateProjectId = async (req, res, next) => {
  try {
    const project = await projects.get(req.params.id)
    if (project) {
      next()
    } else {
      res.status(400).json({ error: 'Invalid project ID' })
    }
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Project information could not be retrieved' })
  }
}

router.use('/:id', validateProjectId)

router
  .route('/')
  .get(controllers.getMany)
  .post(validateProject, controllers.createOne)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(validateProject, controllers.updateOne)
  .delete(controllers.removeOne)

export default router
