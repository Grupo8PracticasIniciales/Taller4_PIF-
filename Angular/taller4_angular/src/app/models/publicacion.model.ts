export class Publicacion{
  constructor(
    public autor_nombre: String,
    public autor_apellido: String,
    public curso: String,
    public catedratico: String,
    public mensaje: String,
    public comentarios: []
  ){}
}
