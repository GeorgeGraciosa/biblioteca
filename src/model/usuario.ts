export class Usuario {
  id?: number
  nome: string
  email: string
  login: string
  senha: string
  cpf: string

  constructor(
    nome: string,
    email: string,
    login: string,
    senha: string,
    cpf: string,
    id?: number
  ) {
    this.nome = nome
    this.email = email
    this.login = login
    this.senha = senha
    this.cpf = cpf
    this.id = id
  }
}
