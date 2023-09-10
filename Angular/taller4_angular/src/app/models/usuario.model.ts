export class Usuario{
  constructor(
    public registro_academico: String,
    public nombre: String,
    public apellido: String,
    public correo: String,
    public contrasena: String,
    public cursos_aprobados: []
  ){}
}
