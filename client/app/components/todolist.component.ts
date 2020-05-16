import { Component, OnInit} from '@angular/core';
import {TodoService} from '../services/todo.service';
import {Todo} from '../Todo';

@Component({
  moduleId: module.id,
  selector: 'todolist',
  templateUrl: 'todolist.component.html'
})

export class TodosComponent implements OnInit {
  todolist: Todo[];
  
  constructor(private _todoService: TodoService){
    
  }
  
  ngOnInit(){
    this.todolist = [];
    this._todoService.getTodos()
      .subscribe(todolist => {
        this.todolist = todolist;
      });
  }

  addTodo(event, todoText){
    console.log(todoText.value);
    var result;
    var newTodo = {
      text: todoText.value,
      isCompleted: false
    };
    
    result = this._todoService.saveTodo(newTodo);
    result.subscribe(x => {
      this.todolist.push(newTodo);
      todoText.value = '';
    });
}
setEditState(todo, state){
  if(state){
    todo.isEditMode = state;
  } else {
    delete todo.isEditMode;
  }
}

updateStatus(todo){
  var _todo = {
    _id:todo._id,
    text: todo.text,
    isCompleted: !todo.isCompleted
  };
  
  this._todoService.updateTodo(_todo)
    .subscribe(data => {
      todo.isCompleted = !todo.isCompleted;
    });
}
updateTodoText(event, todo){
  if(event.which === 13){
      todo.text = event.target.value;
      var _todo = {
        _id: todo._id,
        text: todo.text,
        isCompleted: todo.isCompleted
      };
      
      this._todoService.updateTodo(_todo)
        .subscribe(data => {
          this.setEditState(todo, false);
        })
  }
}
deleteTodo(todo){
  var todolist = this.todolist;
  
  this._todoService.deleteTodo(todo._id)
    .subscribe(data => {
      if(data.n == 1){
        for(var i = 0; i < todolist.length; i++){
          if(todolist[i]._id == todo._id){
            todolist.splice(i, 1);
          }
        }
      }
    })
}

}