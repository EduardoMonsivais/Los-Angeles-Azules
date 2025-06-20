4. Sistema de Documentos con Comentarios y Permisos
Descripción:
Sistema con control de acceso por usuario para comentar en documentos.
Requerimientos funcionales:
CRUD de documentos y comentarios.
Permisos por documento para comentar.
Visualización de cantidad de comentarios por documento.
Base de datos sugerida:
Documentos(id, nombre, tipo, creador_id)
Comentarios(id, documento_id, usuario_id, texto, fecha)
Permisos(documento_id, usuario_id, puede_comentar)
Reglas de negocio:
Solo usuarios con permiso pueden comentar.
Comentarios restringidos a documentos existentes.
Objetivo técnico:
Evaluar lógica de permisos, relaciones complejas y visibilidad condicional.