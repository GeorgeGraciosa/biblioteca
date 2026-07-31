export class Livro {
  id?: number
  titulo: string
  isbn: string
  total_exemplares: number
  editoraId: number
  categoriaID: number
  quantidadeDisponivel: number

  constructor(
    titulo: string,
    isbn: string,
    total_exemplares: number,
    editoraID: number,
    categoriaID: number,
    quantidadeDisponivel: number = 1,
    id?: number
  ) {
    this.titulo = titulo
    this.isbn = isbn
    this.total_exemplares = total_exemplares
    this.editoraId = editoraID
    this.categoriaID = categoriaID
    this.quantidadeDisponivel = quantidadeDisponivel
    this.id = id
  }
}
