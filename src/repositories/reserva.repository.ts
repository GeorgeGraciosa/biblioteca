import { Pool } from "pg";
import { ReservaAcervo } from "../model/reserva-acervo";

export class ReservaRepository {
    constructor(private readonly pool: Pool){}

    async buscarPorId(id: number): Promise<ReservaAcervo | null>{
        const {rows} = await this.pool.query(
            'SELECT * FROM reservas WHERE id = $1',
            [id]
        )
        if(rows.length === 0) return null

        const linha = rows[0]

        return new ReservaAcervo(
            linha.livro_id,
            linha.usuario_id,
            linha.data_reserva,
            linha.status,
            linha.id
        )
    }

    async atualizarStatus(id: number, novoStatus: string): Promise<void>{
        await this.pool.query(
            'UPDATE reservas SET status = $1 WHERE id = $2',
            [novoStatus, id]
        )
    }
}