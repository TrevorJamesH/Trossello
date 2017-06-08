import express from 'express'
import {queries, commands} from '../database'
const router = new express.Router()

// CREATE
router.post('/', (request, response, next) => {
  console.log("label post request", request.body)
  commands.createLabel(request.body)
    .then( () => {
      console.log("created label, didnt break")
      response.json(null)
    })
    .catch(console.log("create label route didnt work"))
})

// EDIT
router.post('/:labelId', (request, response, next) => {
  console.log("attempting edit")
  commands.editLabel(request.body.labelId, request.body)
    .then(card => {
      if (card){
        response.json(card)
        console.log("label edited")
      } else{
        response.status(404).json(null)
        console.log("nothing to edit")
      }
    })
    .catch(next)
})

// DELETE
router.post('/:labelId/delete', (request, response, next) => {
  console.log("Deleting label")
  commands.deleteLabel(request.body.labelId)
    .then(() => {
      response.json(null)
    })
    .catch(next)
})

export default router
