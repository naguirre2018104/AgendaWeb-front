import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styleUrls: ['./hijo.component.css']
})
export class HijoComponent implements OnInit {

  @Input() nombrePadre: String;
  @Input() apellidoPadre: String;
  @Input() edadPadre: Number;

  @Output() enviarDatos = new EventEmitter();

  title: String = "Componente Hijo";
  nombre: String = "Noel";
  apellido: String = "Aguirre";
  edad: Number = 18;

  constructor() { }

  ngOnInit(): void {
  }

  enviarDatosEvento(){
    this.enviarDatos.emit({
      'nombre': this.nombre,
      'apellido': this.apellido,
      'edad': this.edad
    });
  }

}
