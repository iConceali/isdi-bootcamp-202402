# Documentación de la API de Arbitraje de Criptomonedas

Esta documentación detalla los endpoints disponibles en la API de Arbitraje de Criptomonedas, incluyendo métodos disponibles, parámetros requeridos y formatos de respuesta.

## Endpoints

### 1. Obtener Todos los Usuarios

- **URL:** `/api/users`
- **Método:** `GET`
- **Descripción:** Retorna una lista de todos los usuarios registrados en el sistema.
- **Respuesta:**
  - **Código:** 200
  - **Contenido:**
    ```json
    [
      {
        "_id": "123",
        "nombre": "John Doe",
        "correoElectronico": "john@example.com"
      },
      {
        "_id": "124",
        "nombre": "Jane Doe",
        "correoElectronico": "jane@example.com"
      }
    ]
    ```

### 2. Crear Nuevo Usuario

- **URL:** `/api/users`
- **Método:** `POST`
- **Descripción:** Registra un nuevo usuario en la plataforma.
- **Parámetros de Cuerpo:**
  - `nombre` - String | Requerido
  - `correoElectronico` - String | Requerido
  - `contraseña` - String | Requerido
- **Respuesta:**
  - **Código:** 201
  - **Contenido:**
    ```json
    {
      "mensaje": "Usuario creado exitosamente",
      "usuario": {
        "_id": "125",
        "nombre": "Alice Johnson",
        "correoElectronico": "alice@example.com"
      }
    }
    ```

### 3. Obtener Información de Usuario

- **URL:** `/api/users/{id}`
- **Método:** `GET`
- **Descripción:** Retorna información detallada de un usuario específico.
- **Parámetros URL:**
  - `id` - ID del Usuario | Requerido
- **Respuesta:**
  - **Código:** 200
  - **Contenido:**
    ```json
    {
      "_id": "123",
      "nombre": "John Doe",
      "correoElectronico": "john@example.com"
    }
    ```

## Notas

- Todos los endpoints requieren autenticación vía token JWT excepto el endpoint de creación de usuario.
- Las respuestas están en formato JSON.
