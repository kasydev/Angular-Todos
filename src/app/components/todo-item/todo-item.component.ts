import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent implements OnInit {

  @Input()  todo!: Todo;
  @Output() deleteTodo : EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  setClasses (){
      let classes ={
        todo:true,
        'is-complete': this.todo.completed
      }
      return classes;
  }

  onToggle(){

    // Toggle in UI

    this.todo.completed = !this.todo.completed;
    // Toggle on serve
    this.todoService.toggleCompleted(this.todo).subscribe(

       (todo:Todo[]) => {
        console.log(todo);

       }
    );

  }

  onDelete(){
     this.deleteTodo.emit(this.todo);
  }

}
