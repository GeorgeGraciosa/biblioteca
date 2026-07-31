INSERT INTO editora (nome) VALUES ('Panini'), ('HarperCollins'), ('Rocco');
INSERT INTO categoria (nome) VALUES ('Mangá'), ('Fantasia');
INSERT INTO autor (nome) VALUES ('Eiichiro Oda'), ('J.R.R. Tolkien'), ('J.K. Rowling');

INSERT INTO usuario (nome, email, login, senha, cpf) VALUES 
('Ana Silva', 'ana@email.com', 'anasilva', 'senha123', '11122233344'),
('Carlos Souza', 'carlos@email.com', 'carlosouza', 'senha123', '55566677788');

INSERT INTO funcionario (nome, matricula, ativo) VALUES 
('João Bibliotecário', 'M12345', true);

INSERT INTO livro (titulo, isbn, total_exemplares, quantidade_disponivel, editora_id, categoria_id) VALUES 
('One Piece - Vol. 1', '978-8542615671', 2, 0, 1, 1),
('O Senhor dos Anéis: A Sociedade do Anel', '978-8595084742', 4, 3, 2, 2),
('Harry Potter e a Pedra Filosofal', '978-8532530783', 6, 5, 3, 2);

INSERT INTO livro_autor (livro_id, autor_id) VALUES 
(1, 1),
(2, 2),
(3, 3);

INSERT INTO reserva_acervo (usuario_id, funcionario_id, livro_id, data_reserva, status) VALUES 
(1, 1, 1, CURRENT_DATE, 'pendente');