import { CreateUserDto } from './dto/create-user-form.dto'
import { ConsoleView } from '../@common/view/console.view'
import { CreateUserUseCase } from '../usecase/create-user.uc'
import { ReservaUseCase } from '../usecase/reserva.usecase'
import { DevolucaoUseCase } from '../usecase/devolucao.usecase'
import { pool } from '../@common/database/database'

export class MainView extends ConsoleView {
  private readonly FUNCIONARIO_LOGADO_ID = 1

  constructor(
    private readonly createUserUc: CreateUserUseCase,
    private readonly reservaUseCase: ReservaUseCase,
    private readonly devolucaoUseCase: DevolucaoUseCase
  ) {
    super(true)
  }

  protected async update(): Promise<void> {
    this.display('========================================')
    this.display('   Bem-vindo ao Acervo CLI              ')
    this.display('   Sistema de Gestão de Biblioteca      ')
    this.display('========================================')
    this.display('1. Cadastrar novo usuário')
    this.display('2. Reservar um livro')
    this.display('3. Devolver um livro')
    this.display('4. Sair')
    this.display('========================================')

    const opcao = await this.prompt('Escolha uma opção: ')

    switch (opcao) {
      case '1':
        await this.cadastrarUsuario()
        break
      case '2':
        await this.reservarLivro()
        break
      case '3':
        await this.devolverLivro()
        break
      case '4':
        await pool.end()
        this.exit()
        break
      default:
        this.display('Opção inválida!')
        await this.prompt('Pressione ENTER para tentar novamente...')
        break
    }
  }

  private async cadastrarUsuario(): Promise<void> {
    const createUserDto = await this.promptInteractiveForm(
      `Informe os dados do usuário`,
      CreateUserDto.schema(),
      CreateUserDto
    )

    const userOrError = await this.createUserUc
      .execute(createUserDto)
      .catch((error: unknown) => error as Error)

    if (userOrError instanceof Error) {
      this.reportTechnicalError(userOrError)
      await this.prompt('Pressione ENTER para sair...')
      return
    }
    await this.prompt(`Usuario ${userOrError.nome} criado com sucesso!`)
    await this.prompt('Pressione ENTER para sair...')
    this.exit()
  }

  private async reservarLivro(): Promise<void> {
    const usuarioIdStr = await this.prompt('Digite o ID do usuário: ')
    const livroIdStr = await this.prompt('Digite o ID do livro: ')

    const usuarioId = Number(usuarioIdStr)
    const livroId = Number(livroIdStr)

    if (isNaN(usuarioId) || isNaN(livroId)) {
      this.display('Os IDs devem ser números válidos!')
      await this.prompt('Pressione ENTER para voltar...')
      return
    }
    const reserva = await this.reservaUseCase.execute(
      livroId,
      usuarioId,
      this.FUNCIONARIO_LOGADO_ID
    )

    await this.prompt(
      `Reserva realizada com sucesso! ID do livro reservado: ${reserva.livroID}. Pressione ENTER...`
    )
  }

  private async devolverLivro(): Promise<void> {
    const reservaIdStr = await this.prompt(
      'Digite o ID da reserva que será devolvida: '
    )
    const reservaID = Number(reservaIdStr)

    if (isNaN(reservaID)) {
      this.display('O ID deve ser um número valido!')
      await this.prompt('Pressione ENTER para voltar...')
      return
    }
    try {
      const mensagemSucesso = await this.devolucaoUseCase.executar({
        reservaID
      })

      await this.prompt(`${mensagemSucesso} Pressione ENTER para voltar...`)
    } catch (error: any) {
      this.display(`\nErro: ${error.message || 'Ocorreu um erro inesperado.'}`)
      await this.prompt('Pressione ENTER para voltar...')
    }
  }
}
