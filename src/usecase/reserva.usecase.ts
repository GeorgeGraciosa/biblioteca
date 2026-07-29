import { LivroRepository } from "../repositories/livro.repository";
import { ReservaAcervo } from "../model/reserva-acervo";
import { BaseException } from "../@common/errors/base.exception";

export class ReservaUseCase{
    constructor(private readonly livroRepository: LivroRepository){}

    async execute(livroId: number, usuarioId: number): Promise<ReservaAcervo>{
        const livro = await this.livroRepository.buscarPorId(livroId)

        if(!livro){
            throw new BaseException({cause: 'Livro não encontrado no acervo. '})
        }

        if(livro.quantidadeDisponivel <= 0){
            throw new BaseException({cause: 'O livro não possui unidades disponíveis para reserva no momento.'})
        }

        const novaQuantidade = livro.quantidadeDisponivel - 1

        await this.livroRepository.atualizarEstoque(livro.id as number, novaQuantidade)

        const reserva = new ReservaAcervo(
            usuarioId,
            livro.id as number
        )
        return reserva
    }
}