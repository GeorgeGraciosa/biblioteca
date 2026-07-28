-- Active: 1780965962148@@127.0.0.1@5432@biblioteca@public

CREATE TABLE editora (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
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
    cpf VARCHAR(14) UNIQUE NOT NULL,
);

CREATE TABLE livro (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    editora_id INT REFERENCES editora(id),
    categoria_id INT REFERENCES categoria(id),
    quantidade_disponivel INT DEFAULT 1
);

CREATE TABLE livro_autor (
    livro_id INT REFERENCES livro(id),
    autor_id INT REFERENCES autor(id),
    PRIMARY KEY (livro_id, autor_id)
);

CREATE TABLE reserva_acervo (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(id),
    livro_id INT REFERENCES livro(id),
    data_reserva DATE NOT NULL DEFAULT CURRENT_DATE,
    data_devolucao DATE,
    status VARCHAR(20) DEFAULT 'pendente'
);