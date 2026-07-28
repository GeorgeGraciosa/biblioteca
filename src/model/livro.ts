export class Livro {
  id?: number
  titulo: string
  editoraId: number
  categoriaID: number
  quantidadeDisponivel: number

  constructor(
    titulo: string,
    editoraID: number,
    categoriaID: number,
    quantidadeDisponivel: number = 1,
    id?: number
  ) {
    this.titulo = titulo
    this.editoraId = editoraID
    this.categoriaID = categoriaID
    this.quantidadeDisponivel = quantidadeDisponivel
    this.id = id
  }
}
