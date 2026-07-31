import { LivroRepository } from '../repositories/livro.repository'
import { ReservaRepository } from '../repositories/reserva.repository'
import { BaseException } from '../@common/errors/base.exception'

export interface DevolucaoInputDTO {
  reservaID: number
}

export class DevolucaoUseCase {
  constructor(
    private readonly livroRepository: LivroRepository,
    private readonly reservaRepository: ReservaRepository
  ) {}

  async executar(input: DevolucaoInputDTO): Promise<string> {
    const reserva = await this.reservaRepository.buscarPorId(input.reservaID)

    if (!reserva) {
      throw new BaseException({ cause: 'Reserva não encontrada.' })
    }

    if (reserva.status === 'DEVOLVIDO') {
      throw new BaseException({
        cause: 'Esta reserva já consta como devolvida.'
      })
    }

    await this.reservaRepository.atualizarStatus(reserva.id!, 'DEVOLVIDO')

    const livro = await this.livroRepository.buscarPorId(reserva.livroID)

    if (!livro) {
      throw new BaseException({
        cause: 'Livro associado à reserva não encontrado.'
      })
    }

    const novoEstoque = livro.quantidadeDisponivel + 1
    await this.livroRepository.atualizarEstoque(livro.id!, novoEstoque)

    return 'Devolução realizada com sucesso! O livro retornou ao acervo.'
  }
}
