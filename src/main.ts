import 'dotenv/config'
import { initDatabase, pool } from './@common/database/database'
import { UserRepository } from './repositories/user.repository'
import { CreateUserUseCase } from './usecase/create-user.uc'
import { MainView } from './view/main.view'
import { LivroRepository } from './repositories/livro.repository'
import { ReservaUseCase } from './usecase/reserva.usecase'

async function bootstrap() {
  await initDatabase()

  const createUserUc = new CreateUserUseCase(new UserRepository(pool))
  const livroRepository = new LivroRepository(pool)
  const reservaUseCase = new ReservaUseCase(livroRepository)
  const mainView = new MainView(createUserUc, reservaUseCase)

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
