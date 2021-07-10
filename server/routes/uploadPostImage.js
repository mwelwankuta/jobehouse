import express from 'express'

const router = express.Router()

router.post('/uploadPostImage', (req, res) => {
  const image = req.files.file
  const fbID = req.body.fbID
  // work on image storage
  image.mv(`${__dirname}/../../public/${image.name}`)
})

export default router