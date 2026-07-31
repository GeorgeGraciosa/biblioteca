CREATE TABLE funcionario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    matricula VARCHAR(50) UNIQUE NOT NULL,
    ativo BOOLEAN DEFAULT true
);

CREATE TABLE editora (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE autor (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    login VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL
);

CREATE TABLE livro (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    total_exemplares INT NOT NULL,
    quantidade_disponivel INT NOT NULL,
    editora_id INT REFERENCES editora(id),
    categoria_id INT REFERENCES categoria(id)
);

CREATE TABLE livro_autor (
    livro_id INT REFERENCES livro(id),
    autor_id INT REFERENCES autor(id),
    PRIMARY KEY (livro_id, autor_id)
);

CREATE TABLE reserva_acervo (
    id SERIAL PRIMARY KEY,
    livro_id INT REFERENCES livro(id),
    funcionario_id INT REFERENCES funcionario(id),
    usuario_id INT REFERENCES usuario(id),
    data_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_devolucao TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pendente'
);