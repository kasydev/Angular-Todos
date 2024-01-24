import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.todoService.getTodos().subscribe(
      (todo: Todo[]) => {
        // Update the todos array with the data received from the service
        this.todos = todo;
      },
      (error) => {
        // Handle error, log it or show a user-friendly message
        console.error('Error fetching todos:', error);
      }
    );
  }

  deleteTodo(todo:Todo){
    console.log("delete me");
   // From the UI
    this.todos = this.todos.filter( t => t.id != todo.id);

    // From the UI

    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo:Todo){

        this.todoService.addTodo(todo).subscribe(
          (todo:Todo) =>{
             this.todos.push(todo);
          }
        )
  }

}
