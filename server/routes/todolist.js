var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb+srv://xolani:ndimlo123@cluster0-wid7v.mongodb.net/test?retryWrites=true&w=majority',['todolist'],{ dbName: 'todolist' });


// Get TodoList
router.get('/todolist', function(req, res, next){
    db.todolist.find(function(err,todolist){
            if(err){
               res.send(err); 
            } else {
               res.json(todolist.sort(function(a, b){return a.isCompleted - b.isCompleted;}));
            }});
            
   
    });

// Get Single Todo
router.get('/todo/:id', function(req, res, next){
    db.todolist.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, todo){
        if(err){
           res.send(err); 
        } else {
           res.json(todo);
        }
    });
});

// Save Todo
router.post('/todo', function(req, res, next){
    var todo = req.body;
    if(!todo.title || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todolist.save(todo, function(err, result){
            if(err){
                res.send(err); 
            } else {
                res.json(result);
            }
        });
    }
});

// Update Todo
router.put('/todo/:id', function(req, res, next){
    var todo = req.body;
    var updObj = {};
    
    if(todo.isCompleted){
       updObj.isCompleted = todo.isCompleted;
    }
    
    if(todo.title){
        updObj.title = todo.title;
    }
    
    if(!updObj){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todolist.updateOne(
            { _id: mongojs.ObjectId(req.params.id) },
            { $set: { isCompleted: todo.isCompleted, text: todo.text } },
            { upsert: true }
        )
    }
});

// Delete Todo
router.delete('/todo/:id', function(req, res, next){
    db.todolist.remove({
        _id: mongojs.ObjectId(req.params.id)
    },'', function(err, result){
        if(err){
            res.send(err); 
        } else {
            res.json(result);
        }
    });
});
module.exports = router;