const router = require('express').Router()
const {User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    // if (req.user) {
    //   if (req.user.dataValues.isAdmin === false) {
    //     res.status(403).send('You do not have permission to access this.')
    //   } else {
    const users = await User.findAll({
      attributes: ['id', 'email', 'isAdmin']
    })
    res.json(users)
    //   }
    // } else {
    //   res.status(403).send('You do not have permission to access this.')
    // }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    // if (req.user) {
    // if (req.user.dataValues.isAdmin === false) {
    // res.status(400).send('You do not have permission to access this.')
    // } else {
    const users = await User.findByPk(req.params.id)
    res.json(users)
    // }
    // } else {
    // res.status(400).send('You do not have permission to access this.')
    // }
  } catch (err) {
    next(err)
  }
})

router.put('/profile', async (req, res, next) => {
  try {
    await User.update(req.body, {
      where: {
        id: req.session.passport.user
      }
    })

    const profile = await User.findOne({
      where: {
        id: req.session.passport.user
      }
    })
    res.json(profile)
  } catch (error) {
    next(error)
  }
})

module.exports = router
