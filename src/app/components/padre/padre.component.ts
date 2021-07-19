import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-padre',
  templateUrl: './padre.component.html',
  styleUrls: ['./padre.component.css']
})
export class PadreComponent implements OnInit {

  title: String = "Componente Padre";
  nombre: String = "César";
  apellido: String = "Aguirre";
  edad: Number = 42;
  infoHijo: any;

  constructor() { }

  ngOnInit(): void {
  }

  capturarNombre(){
    console.log(this.nombre);
  }

  obtenerDatos(event){
    this.infoHijo = event;
    console.log(event);
  }

}
