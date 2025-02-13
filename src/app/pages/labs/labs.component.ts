import { Component, signal } from '@angular/core';

import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  tasks = signal([
    'Instalar el Angular CLI',
    'Crear proyecto',
    'Crear componente'
  ])

  name = signal('Andres')
  disabled= false

  person = signal({
    name: 'Andres',
    age: 18,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  });

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true
  });
  nameCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });

  constructor() {
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value)
    })
  }

  clickHandler() {
    alert("Hola")
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value
    this.name.set(newValue)

  }

  keydownHandle(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value)
  }

  changeAge(event: Event) {
    const input = event.target as HTMLInputElement
    const newValue = input.value
    this.person.update(prevState => {
      return {
        ...prevState,
        age: parseInt(newValue, 10)
      }
    })
  }

  changeName(event: Event) {
    const input = event.target as HTMLInputElement
    const newValue = input.value
    this.person.update(prevState => {
      return {
        ...prevState,
        name: newValue
      }
    })
  }
}
