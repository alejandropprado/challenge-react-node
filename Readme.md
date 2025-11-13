# Challenge React Node - Posts Management System

> **Sistema de gestión de posts construido con arquitectura limpia, DDD y mejores prácticas de desarrollo**

## 🎯 Propósito del Proyecto

Este proyecto demuestra la implementación de un sistema full-stack de gestión de posts utilizando **Clean Architecture**, **Domain Driven Design (DDD)** y **mejores prácticas de desarrollo**.

## 🏗️ Arquitectura del Sistema

### Backend - Node.js + TypeScript
- **Clean Architecture**: Separación clara de capas (Domain, Application, Infrastructure)
- **Domain Driven Design**: Modelado del dominio con Value Objects y Entities
- **SOLID Principles**: Código mantenible y extensible
- **Hexagonal Architecture**: Puertos y adaptadores para desacoplamiento
- **TypeORM**: ORM con migraciones y mappers
- **Testing**: Cobertura completa con Jest (Unit + Integration)

### Frontend - React + Redux Toolkit
- **Component-based Architecture**: Componentes reutilizables y modulares
- **State Management**: Redux Toolkit para manejo de estado global
- **TypeScript**: Tipado fuerte end-to-end
- **Responsive Design**: UI adaptativa y accesible

### Base de Datos
- **PostgreSQL**: Base de datos relacional con soft deletes
- **Migraciones**: Control de versiones de esquema
- **Docker**: Contenedorización completa del stack

## 🚀 Inicio Rápido

### Prerrequisitos
- **Docker** y **Docker Compose** instalados
- **Git** para clonar el repositorio
- Puertos **3000**, **4173**, y **5432** disponibles

### 1. Clonar el Repositorio
```bash
git clone https://github.com/alejandropprado/challenge-react-node.git
cd challenge-react-node
```

### 2. Levantar el Stack Completo
```bash
docker-compose up --build
```

Este comando:
- ✅ Construye las imágenes del backend y frontend
- ✅ Levanta PostgreSQL con datos de prueba
- ✅ Ejecuta migraciones automáticamente
- ✅ Inicia la API en el puerto **3000**
- ✅ Sirve el frontend en el puerto **4173**

### 3. Acceder a la Aplicación

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Frontend** | http://localhost:4173 | Interfaz de usuario principal |
| **API** | http://localhost:3000/api/v1 | API REST endpoints |
| **API Docs** | [swagger.yaml](./backend/src/infrastructure/http/swagger.yaml) | Especificación OpenAPI 3.0 |
| **Database** | localhost:5432 | PostgreSQL (usuario: app_user, password: app_pass) |

## 🛠️ Desarrollo Local

### Backend
```bash
cd backend
npm install
npm run dev        # Servidor de desarrollo
npm test           # Ejecutar tests
npm run test:watch # Tests en modo watch
```

### Frontend  
```bash
cd posts-frontend
npm install
npm run dev        # Servidor de desarrollo Vite
npm run build      # Build para producción
```

### Base de Datos
```bash
# Solo PostgreSQL
docker-compose up postgres -d

# Ejecutar migraciones manualmente
cd backend
npm run db:migrate
```

## 📁 Estructura del Proyecto

```
├── backend/                    # API Node.js + TypeScript
│   ├── src/
│   │   ├── posts/             # Módulo Posts (DDD Bounded Context)
│   │   │   ├── domain/        # Entities, Value Objects, Repository Interfaces
│   │   │   ├── application/   # Use Cases (Business Logic)
│   │   │   └── infrastructure/ # Controllers, ORM, HTTP Routes
│   │   ├── shared/            # Cross-cutting concerns
│   │   ├── infrastructure/    # Database, HTTP, External services
│   │   └── main/              # Application entry point
│   ├── Dockerfile
│   └── docker-compose.yml
├── posts-frontend/             # React + Redux Toolkit
│   ├── src/
│   │   ├── app/               # Redux store configuration
│   │   ├── features/posts/    # Posts feature module
│   │   ├── shared/            # Shared components & utilities
│   │   └── assets/
│   └── Dockerfile
└── docker-compose.yaml         # Stack completo
```

## 🧪 Testing

### Backend
```bash
npm test                    # Todos los tests
npm run test:unit          # Tests unitarios
npm run test:integration   # Tests de integración
npm run test:watch         # Modo watch
```

**Cobertura de Tests:**
- ✅ Use Cases (CreatePost, DeletePost, ListPosts)  
- ✅ Value Objects (PostId validation)
- ✅ HTTP Routes (Integration tests)
- ✅ Repository patterns
- ✅ Error handling scenarios

## 📚 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/v1/posts` | Listar todos los posts |
| `POST` | `/api/v1/posts` | Crear nuevo post |
| `DELETE` | `/api/v1/posts/:id` | Eliminar post (soft delete) |

### Ejemplo de Uso
```bash
# Listar posts
curl http://localhost:3000/api/v1/posts

# Crear post
curl -X POST http://localhost:3000/api/v1/posts \
  -H "Content-Type: application/json" \
  -d '{"name":"Mi Post","description":"Descripción del post"}'

# Eliminar post
curl -X DELETE http://localhost:3000/api/v1/posts/{post-id}
```

## 🔧 Tecnologías Utilizadas

### Backend Stack
- **Node.js** + **TypeScript** - Runtime y tipado
- **Express.js** - Framework web minimalista
- **TypeORM** - ORM con decorators y migraciones
- **PostgreSQL** - Base de datos relacional
- **Zod** - Validación de esquemas
- **Jest** + **Supertest** - Testing framework
- **Pino** - Logging estructurado
- **Docker** - Contenedorización

### Frontend Stack  
- **React 19** - Librería de interfaces
- **Redux Toolkit** - Manejo de estado predictible
- **TypeScript** - Tipado fuerte
- **Vite** - Build tool y dev server
- **Axios** - Cliente HTTP
- **CSS Variables** - Estilos responsive

## 🏆 Patrones y Principios Implementados

### Arquitectura
- ✅ **Clean Architecture** - Independencia de frameworks y UI
- ✅ **Hexagonal Architecture** - Puertos y adaptadores  
- ✅ **Domain Driven Design** - Modelado rico del dominio
- ✅ **CQRS Pattern** - Separación comando/consulta
- ✅ **Repository Pattern** - Abstracción de persistencia

### SOLID Principles
- ✅ **Single Responsibility** - Clases con una sola razón de cambio
- ✅ **Open/Closed** - Abierto para extensión, cerrado para modificación
- ✅ **Liskov Substitution** - Interfaces intercambiables
- ✅ **Interface Segregation** - Interfaces específicas y cohesivas
- ✅ **Dependency Inversion** - Dependencias hacia abstracciones

### Testing Strategy
- ✅ **Unit Tests** - Lógica de negocio aislada
- ✅ **Integration Tests** - Flujos end-to-end
- ✅ **Mocking Strategies** - Aislamiento de dependencias
- ✅ **Test Coverage** - Cobertura de casos críticos

## 🚦 Estado del Proyecto

- ✅ **Backend API** - Completamente funcional
- ✅ **Frontend UI** - Interfaz responsive y accesible  
- ✅ **Database Schema** - Migraciones y seeders
- ✅ **Docker Setup** - Stack completo containerizado
- ✅ **Documentation** - README, API docs, código documentado
- ✅ **Testing Suite** - Cobertura de tests

## 🐛 Troubleshooting

### Problemas Comunes

**Puerto ocupado:**
```bash
# Verificar puertos en uso
lsof -i :3000
lsof -i :4173
lsof -i :5432

# Cambiar puertos en docker-compose.yaml si es necesario
```

**Contenedores existentes:**
```bash
# Limpiar contenedores anteriores
docker-compose down
docker rm -f posts_db posts_api posts_frontend

# Reiniciar stack
docker-compose up --build
```

**Problemas de permisos (MacOS/Linux):**
```bash
# Dar permisos a directorios
chmod +x backend/scripts/*
```

## 📖 Documentación Adicional

- [API Documentation (Swagger)](./backend/src/infrastructure/http/swagger.yaml)

## 👨‍💻 Información del Autor

**Alejandro Prado** - Full Stack Senior & Arquitecto de Software & Tech Lead

Este proyecto demuestra:
- Diseño de arquitecturas escalables y mantenibles
- Implementación de patrones de diseño avanzados  
- Liderazgo técnico en decisiones de arquitectura
- Mejores prácticas de development y DevOps
- Capacidad de mentoring y code review

---

