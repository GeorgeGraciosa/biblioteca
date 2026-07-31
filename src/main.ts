import 'dotenv/config'
import { initDatabase, pool } from './@common/database/database'
import { UserRepository } from './repositories/user.repository'
import { CreateUserUseCase } from './usecase/create-user.uc'
import { MainView } from './view/main.view'
import { LivroRepository } from './repositories/livro.repository'
import { ReservaUseCase } from './usecase/reserva.usecase'
import { DevolucaoUseCase } from './usecase/devolucao.usecase'
import { ReservaRepository } from './repositories/reserva.repository'

async function bootstrap() {
  await initDatabase()

  const createUserUc = new CreateUserUseCase(new UserRepository(pool))
  const livroRepository = new LivroRepository(pool)
  const reservaRepository = new ReservaRepository(pool)
  const reservaUseCase = new ReservaUseCase(livroRepository, reservaRepository)
  const devolucaoUseCase = new DevolucaoUseCase(
    livroRepository,
    reservaRepository
  )
  const mainView = new MainView(createUserUc, reservaUseCase, devolucaoUseCase)

  await mainView.start()
}

bootstrap()
  .then(() => {
    process.exit(0)
  })
  .catch((e: unknown) => {
    console.log('UNHANDLED REJECTION')
    console.error(e)
    process.exit(1)
  })
