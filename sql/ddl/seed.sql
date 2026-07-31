INSERT INTO editora (nome) VALUES ('Panini'), ('HarperCollins'), ('Rocco');;
INSERT INTO categoria (nome) VALUES ('Mangá'), ('Fantasia');
INSERT INTO autor (nome) VALUES ('Eiichiro Oda'), ('J.R.R. Tolkien'), ('J.K. Rowling');

INSERT INTO usuario (nome, email, login, senha, cpf) VALUES 
('Ana Silva', 'ana@email.com', 'anasilva', 'senha123', '11122233344'),
('Carlos Souza', 'carlos@email.com', 'carlosouza', 'senha123', '55566677788');

INSERT INTO livro (titulo, editora_id, categoria_id, quantidade_disponivel) VALUES 
('One Piece - Vol. 1', 1, 1, 0),
('O Senhor dos Anéis: A Sociedade do Anel', 2, 2, 3),
('Harry Potter e a Pedra Filosofal', 3, 2, 5);

INSERT INTO livro_autor (livro_id, autor_id) VALUES 
(1, 1),
(2, 2),
(3, 3);

INSERT INTO reserva_acervo (usuario_id, livro_id, data_reserva, status) VALUES 
(1, 1, CURRENT_DATE, 'pendente');