var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var db = mongojs('mongodb+srv://xolani:ndimlo123@cluster0-wid7v.mongodb.net/test?retryWrites=true&w=majority',['todolist'],{ dbName: 'todolist' });


// Get All Todos
router.get('/todolist', function(req, res, next) {
  db.todolist.find(function(err, todolist) {
    if (err) {
      res.send(err)
    }
    res.json(todolist)
  })
})

// Get Single Todo
router.get('/todo/:id', function(req, res, next) {
  db.todolist.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(
    err,
    todo
  ) {
    if (err) {
      res.send(err)
    }
    res.json(todo)
  })
})

//Save Todo
router.post('/todolist', function(req, res, next) {
  var todo = req.body
  console.log(todo)
  if (!todo.title) {
    res.status(400)
    res.json({
      error: 'Bad Data'
    })
  } else {
    db.todolist.save(todo, function(err, todo) {
      if (err) {
        res.send(err)
      }
      res.json(todo)
    })
  }
})

// Delete Todo
router.delete('/todo/:id', function(req, res, next) {
  db.todolist.remove({ _id: mongojs.ObjectId(req.params.id) }, function(
    err,
    todo
  ) {
    if (err) {
      res.send(err)
    }
    res.json(todo)
  })
})

// Update Todo
router.put('/todo/:id', function(req, res, next) {
  var todo = req.body
  var updTodo = {}

  if (todo.title) {
    updTodo.title = todo.title
  }

  if (!updTodo) {
    res.status(400)
    res.json({
      error: 'Bad Data'
    })
  } else {
    db.todolist.update(
      { _id: mongojs.ObjectId(req.params.id) },
      updTodo,
      {},
      function(err, todo) {
        if (err) {
          res.send(err)
        }
        res.json(todo)
      }
    )
  }
})

module.exports = router
