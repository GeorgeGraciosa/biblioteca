export class ReservaAcervo {
  id?: number
  usuarioID: number
  funcionarioID: number
  livroID: number
  dataReserva: Date
  dataDevolucao?: Date
  status: string

  constructor(
    usuarioID: number,
    funcionarioID: number,
    livroID: number,
    status: string = 'pendente',
    dataReserva: Date = new Date(),
    dataDevolucao?: Date,
    id?: number
  ) {
    this.usuarioID = usuarioID
    this.funcionarioID = funcionarioID
    this.livroID = livroID
    this.status = status
    this.dataReserva = dataReserva
    this.dataDevolucao = dataDevolucao
    this.id = id
  }
}
