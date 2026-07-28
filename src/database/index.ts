import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export async function testarConexao() {
  try {
    const client = await pool.connect()
    console.log('Conexao com o banco de dados estabelecida!')
    client.release()
  } catch (erro) {
    console.error('Falha ao conectar com o banco de dados.', erro)
  }
}
export default pool
