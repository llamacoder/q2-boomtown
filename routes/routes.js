'use strict';

const express = require('express')
const router = express.Router()
const server = require('../serverSide/server')


router.get('/', server.getAll)
router.post('/', server.create)
router.get('/:id', server.getOne)
router.put('/:id', server.updateOne)
router.delete('/:id', server.deleteOne)
router.get('/mentors', server.getMentors)


module.exports = router
