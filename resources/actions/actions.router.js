import express from 'express'
import controllers from './actions.controllers'

const router = express.Router()

router.route('/').get(controllers.getMany)

export default router
