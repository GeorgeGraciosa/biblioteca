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
      linha.livro_id,
      linha.status,
      linha.data_reserva,
      linha.data_devolucao,
      linha.id
    )
  }

  async atualizarStatus(id: number, novoStatus: string): Promise<void> {
    await this.pool.query(
      'UPDATE reserva_acervo SET status = $1 WHERE id = $2',
      [novoStatus, id]
    )
  }
}
