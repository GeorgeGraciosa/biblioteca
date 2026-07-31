import { Pool } from 'pg'
import { Livro } from '../model/livro'

export class LivroRepository {
  constructor(private readonly pool: Pool) {}

  async buscarPorId(id: number): Promise<Livro | null> {
    const { rows } = await this.pool.query(
      'SELECT * FROM livro WHERE id = $1',
      [id]
    )

    if (rows.length === 0) return null

    const linha = rows[0]

    return new Livro(
      linha.titulo,
      linha.isbn,
      linha.total_exemplares,
      linha.editora_id,
      linha.categoria_id,
      linha.quantidade_disponivel,
      linha.id
    )
  }
  async atualizarEstoque(id: number, novaQuantidade: number): Promise<void> {
    await this.pool.query(
      'UPDATE livro SET quantidade_disponivel = $1 WHERE id = $2',
      [novaQuantidade, id]
    )
  }
}
