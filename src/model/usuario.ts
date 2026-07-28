export class Usuario {
  id?: number
  nome: string
  email: string
  senha?: string
  tipo: string

  constructor(
    nome: string,
    email: string,
    senha?: string,
    tipo: string = 'comum',
    id?: number
  ) {
    this.nome = nome
    this.email = email
    this.senha = senha
    this.tipo = tipo
    this.id = id
  }
}
