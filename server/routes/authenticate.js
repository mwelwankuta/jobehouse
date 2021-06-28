import { Router } from 'express'
import UserModel from '../models/UserModel.js'

const router = Router()

router.post('/authenticate', (req, res) => {
  // code goes here
  UserModel.find({ fbID: req.body.fbID }, (err, data) => {
    if (err)
      res.status(500).send({ msg: 'Server error, please try again later' })
    if (data.length > 0) {
      res.status(200).send(data)
    } else {
      const user = {
        fbID: req.body.fbID,
        name: req.body.name,
        picture: req.body.picture,
        bio: req.body.bio,
        upvotes: [],
        downvotes: [],
        email: req.body.email,
        createdAt: Date.now(),
      }
      UserModel.create(user, (err, data) => {
        if (err) throw err
        res.status(201).send(data)
      })
    }
  })
})

export default router
