import { Component, OnInit } from '@angular/core'

import { Todo } from './todo'
import { TodolistService } from './todolist.service'

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  providers: [TodolistService]
})
export class TodolistComponent implements OnInit {
  todolist: Todo[]
  editTodo: Todo

  constructor(private todoService: TodolistService) {}

  ngOnInit() {
    this.getTodolist()
  }

  getTodolist(): void {
    this.todoService.getTodolist().subscribe(todolist => (this.todolist = todolist))
  }

  add(title: string): void {
    this.editTodo = undefined
    title = title.trim()
    if (!title) {
      return
    }
    const newTodo: any = { title: title }
    // const newTodo: Todo = { title } as Todo
    this.todoService.addTodo(newTodo).subscribe(todo => this.todolist.push(todo))
    this.todoService.saveTodo(newTodo)

  }

  delete(todo: Todo): void {
    this.todolist = this.todolist.filter(h => h !== todo)
    this.todoService.deleteTodo(todo._id).subscribe()
  }

  edit(todo) {
    this.editTodo = todo
  }

  update() {
    if (this.editTodo) {
      this.todoService.updateTodo(this.editTodo).subscribe(todo => {
        const ix = todo ? this.todolist.findIndex(h => h._id === todo._id) : -1
        if (ix > -1) {
          this.todolist[ix] = todo
        }
      })
      this.editTodo = undefined
    }
  }
}
