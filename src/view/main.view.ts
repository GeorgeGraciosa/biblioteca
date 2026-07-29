import { CreateUserDto } from './dto/create-user-form.dto'
import { ConsoleView } from '../@common/view/console.view'
import { CreateUserUseCase } from '../usecase/create-user.uc'
import { ReservaUseCase } from '../usecase/reserva.usecase'

export class MainView extends ConsoleView {
  constructor(
    private readonly createUserUc: CreateUserUseCase,
    private readonly reservaUseCase: ReservaUseCase
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
    this.display('3. Sair')
    this.display('========================================')

    const opcao = await this.prompt('Escolha uma opção: ')

    switch (opcao) {
      case '1':
        await this.cadastrarUsuario()
        break;
      case '2':
        await this.reservarLivro()
        break;
      case '3':
        this.exit()
        break;
      default:
        this.display('Opção inváçida!')
        await this.prompt('Pressione ENTER para tentar novamente...')
        break;
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
    await this.prompt(
      `Usuario ${userOrError.nome} criado com sucesso!`
    )
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
    const reserva = await this.reservaUseCase.execute(livroId, usuarioId)

    await this.prompt(`Reserva realizada com sucesso! ID do livro reservado: ${reserva.livroID}. Pressione ENTER...`)
  }
}
