const model = require('../models/books')
const knex = require('../knex')


function getAll(req, res, next) {
  return knex('books').select('id', 'title', 'author', 'genre', 'description',
              'cover_url as coverUrl', 'created_at as createdAt',
              'updated_at as updatedAt').orderBy('title')
              .then(results => {
                res.status(200).json(results)
        })
}

function create(req, res, next) {
  const { title, author, genre, description, coverUrl  } = req.body
  res.set('Content-Type', 'application/json')
  if (!title)
    return next({ status: 400, message: `Title must not be blank` })
    if (!author)
      return next({ status: 400, message: `Author must not be blank` })
  if (!genre)
    return next({ status: 400, message: `Genre must not be blank` })
  if (!description)
    return next({ status: 400, message: `Description must not be blank` })
  if (!coverUrl)
    return next({ status: 400, message: `Cover URL must not be blank` })

  model.create(title, author, genre, description, coverUrl)
    .then(results => {
      res.status(200).json(results[0])
    })
}

function getOne(req, res, next) {
  const id = req.params.id
  if (isNaN(Number(id))) {
    res.set('Content-Type', 'text/plain')
    res.sendStatus(404)
  } else {
    model.getOne(Number(id)).then(results => {
      if (results.length === 0) {
        res.set('Content-Type', 'text/plain')
        res.sendStatus(404)
      } else {
        res.set('Content-Type', 'application/json')
        res.status(200).json(results[0])
      }
    })
  }
}

function updateOne(req, res, next) {
  const id = req.params.id
  isNaN(Number(id)) ? res.sendStatus(404) :
    model.getOne(Number(id))
      .then(results => {
        if (results.length === 0) {
          res.sendStatus(404)
        } else {
          const { title, author, genre, description, coverUrl  } = req.body
          if (!title)
            return next({ status: 400, message: `Title must not be blank` })
          if (!author)
            return next({ status: 400, message: `Author must not be blank` })
          if (!genre)
            return next({ status: 400, message: `Genre must not be blank` })
          if (!description)
            return next({ status: 400, message: `Description must not be blank` })
          if (!coverUrl)
            return next({ status: 400, message: `Cover URL must not be blank` })
          model.updateOne(Number(id), title, author, genre, description, coverUrl)
            .then(updatedResults => {
              if (updatedResults.length === 0) {
                res.sendStatus(404)
              } else {
                res.set('Content-Type', 'application/json')
                res.status(200).json(updatedResults[0])
              }
            })
        }
      })
}

function deleteOne(req, res, next) {
  const id = req.params.id
  isNaN(Number(id)) ? res.sendStatus(404) :
    model.deleteOne(id).then(results => {
      results.length === 0 ? res.sendStatus(404) : res.status(200).json(results[0])
    })
}


module.exports = {
  getAll, getOne, create, updateOne, deleteOne
}
