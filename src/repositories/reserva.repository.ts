import { Pool } from 'pg'
import { ReservaAcervo } from '../model/reserva-acervo'

export class ReservaRepository {
  constructor(private readonly pool: Pool) {}

  async buscarPorId(id: number): Promise<ReservaAcervo | null> {
    const { rows } = await this.pool.query(
      'SELECT * FROM reserva_acervo WHERE id = $1',
      [id]
    )
    if (rows.length === 0) return null

    const linha = rows[0]

    return new ReservaAcervo(
      linha.usuario_id,
      linha.funcionario_id,
      linha.livro_id,
      linha.status,
      linha.data_reserva,
      linha.data_devolucao,
      linha.id
    )
  }

  async criar(reserva: ReservaAcervo): Promise<void> {
    await this.pool.query(
      `INSERT INTO reserva_acervo (livro_id, funcionario_id, usuario_id, data_reserva, status)
        VALUES($1, $2, $3, $4, $5)`,
      [
        reserva.livroID,
        reserva.funcionarioID,
        reserva.usuarioID,
        reserva.dataReserva,
        reserva.status
      ]
    )
  }

  async atualizarStatus(id: number, novoStatus: string): Promise<void> {
    await this.pool.query(
      'UPDATE reserva_acervo SET status = $1 WHERE id = $2',
      [novoStatus, id]
    )
  }
}
