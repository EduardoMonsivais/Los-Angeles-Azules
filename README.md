4. Sistema de Documentos con Comentarios y Permisos
Descripción:
Sistema con control de acceso por usuario para comentar en documentos.

Requerimientos funcionales:
CRUD de documentos y comentarios.
Permisos por documento para comentar.
Visualización de cantidad de comentarios por documento.
Base de datos sugerida: (Estructura que usaremos en la base de datos)
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
Documentos(id, nombre, tipo, creador_id)
Comentarios(id, documento_id, usuario_id, texto, fecha)
Permisos(documento_id, usuario_id, puede_comentar)

Reglas de negocio:
Solo usuarios con permiso pueden comentar.
Comentarios restringidos a documentos existentes.

Objetivo técnico:
Evaluar lógica de permisos, relaciones complejas y visibilidad condicional.
