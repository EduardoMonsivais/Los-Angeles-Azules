CREATE TABLE IF NOT EXISTS Documentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    tipo TEXT,
    creador_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS Comentarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    documento_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    texto TEXT NOT NULL,
    fecha TEXT NOT NULL,
    FOREIGN KEY(documento_id) REFERENCES Documentos(id)
);

CREATE TABLE IF NOT EXISTS Permisos (
    documento_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    puede_comentar BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY(documento_id, usuario_id),
    FOREIGN KEY(documento_id) REFERENCES Documentos(id)
);
