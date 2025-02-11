import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    tasks = signal<Task[]>([
      {
        id: Date.now(),
        title: 'Crear componentes',
        completed: false
      }
    ])

    newTasksCtrl = new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern('^\\S.*$'),
        Validators.minLength(3),
      ]
    }
    )

    changeHandler() {
      if (this.newTasksCtrl.valid) {
        const value = this.newTasksCtrl.value
        this.addTask(value);
        this.newTasksCtrl.setValue('');
      }
    }

    addTask(title: string) {
      const newTask = {
        id: Date.now(),
        title,
        completed: false
      }

      this.tasks.update((tasks) => [...tasks, newTask])

    }

    deleteTask(index: number) {
      this.tasks.update((tasks) => tasks.filter((task, position) => position !== index))
    }

    updateTask(index: number) {
      this.tasks.update((tasks) => {
        return tasks.map((tasks, position) => {
          if (position === index) {
            return {
              ...tasks,
              completed: !tasks.completed
            }
          }

          return tasks
        })
      })
    }

    updateTaskEditingMode(index: number) {
      this.tasks.update((tasks) => {
        return tasks.map((task, position) => {
          if (position === index) {
            return {
              ...task,
              editing: true
            }
          }

          return {
            ...task,
            editing: false
          }
        })
      })
    }

    updateTaskText(index: number, event: Event) {
      const input = event.target as HTMLInputElement
      this.tasks.update((tasks) => {
        return tasks.map((task, position) => {
          if (position === index) {
            return {
              ...task,
              title: input.value,
              editing: false
            }
          }

          return task
        })
      })
    }
}
