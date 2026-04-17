const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', example: '661ef1f784fa50b5e4d72a4a' },
    name: { type: 'string', example: 'Juan Perez' },
    email: { type: 'string', format: 'email', example: 'juan@example.com' },
    phone: { type: 'string', nullable: true, example: '5551234567' },
    userType: { type: 'string', enum: ['client', 'provider'], example: 'client' },
    isActive: { type: 'boolean', example: true },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }
  }
};

const authResponseSchema = {
  type: 'object',
  properties: {
    user: userSchema,
    token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
  }
};

const responseEnvelope = (dataSchema, messageExample = 'Operation successful') => ({
  type: 'object',
  properties: {
    success: { type: 'boolean', example: true },
    message: { type: 'string', example: messageExample },
    data: dataSchema
  }
});

export const openApiDocument = {
  openapi: '3.0.3',
  info: {
    title: 'User System API',
    version: '1.0.0',
    description:
      'API en Deno para autenticacion, recuperacion de contrasena y administracion de usuarios client/provider con MongoDB.'
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Local'
    }
  ],
  tags: [
    { name: 'Docs', description: 'Documentacion de la API' },
    { name: 'Auth', description: 'Registro, login y recuperacion de contrasena' },
    { name: 'Users', description: 'CRUD de usuarios protegido con JWT' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      User: userSchema,
      RegisterRequest: {
        type: 'object',
        required: ['name', 'email', 'password', 'userType'],
        properties: {
          name: { type: 'string', example: 'Juan Perez' },
          email: { type: 'string', format: 'email', example: 'juan@example.com' },
          password: { type: 'string', format: 'password', example: 'Secret123' },
          phone: { type: 'string', example: '5551234567' },
          userType: { type: 'string', enum: ['client', 'provider'], example: 'client' }
        }
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'juan@example.com' },
          password: { type: 'string', format: 'password', example: 'Secret123' }
        }
      },
      ForgotPasswordRequest: {
        type: 'object',
        required: ['email'],
        properties: {
          email: { type: 'string', format: 'email', example: 'juan@example.com' }
        }
      },
      ResetPasswordRequest: {
        type: 'object',
        required: ['token', 'newPassword'],
        properties: {
          token: { type: 'string', example: '0f788742-b0ad-46ff-8c7b-2cc44fdd42dc' },
          newPassword: { type: 'string', format: 'password', example: 'NewSecret123' }
        }
      },
      UpdateUserRequest: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Juan Perez Actualizado' },
          email: { type: 'string', format: 'email', example: 'juan.new@example.com' },
          password: { type: 'string', format: 'password', example: 'Secret1234' },
          phone: { type: 'string', example: '5550001111' },
          userType: { type: 'string', enum: ['client', 'provider'], example: 'provider' },
          isActive: { type: 'boolean', example: true }
        }
      },
      AuthResponse: authResponseSchema,
      ForgotPasswordResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Reset password token generated successfully' },
          resetPasswordToken: {
            type: 'string',
            example: '0f788742-b0ad-46ff-8c7b-2cc44fdd42dc'
          },
          expiresAt: { type: 'string', format: 'date-time' }
        }
      },
      SuccessMessageResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Password updated successfully' }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Invalid credentials' }
        }
      }
    }
  },
  paths: {
    '/docs/openapi.json': {
      get: {
        tags: ['Docs'],
        summary: 'Obtener documento OpenAPI',
        responses: {
          '200': {
            description: 'Documento OpenAPI'
          }
        }
      }
    },
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Registrar usuario',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterRequest' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Usuario registrado',
            content: {
              'application/json': {
                schema: responseEnvelope(
                  { $ref: '#/components/schemas/AuthResponse' },
                  'User registered successfully'
                )
              }
            }
          },
          '409': {
            description: 'Email duplicado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Iniciar sesion',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Login correcto',
            content: {
              'application/json': {
                schema: responseEnvelope(
                  { $ref: '#/components/schemas/AuthResponse' },
                  'Login successful'
                )
              }
            }
          },
          '401': {
            description: 'Credenciales invalidas',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/api/auth/forgot-password': {
      post: {
        tags: ['Auth'],
        summary: 'Generar token de recuperacion',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ForgotPasswordRequest' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Token generado',
            content: {
              'application/json': {
                schema: responseEnvelope(
                  { $ref: '#/components/schemas/ForgotPasswordResponse' },
                  'Reset password token generated successfully'
                )
              }
            }
          },
          '404': {
            description: 'Usuario no encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/api/auth/reset-password': {
      post: {
        tags: ['Auth'],
        summary: 'Cambiar contrasena con token',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ResetPasswordRequest' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Contrasena actualizada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessMessageResponse' }
              }
            }
          },
          '400': {
            description: 'Token invalido o expirado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/api/users': {
      post: {
        tags: ['Users'],
        summary: 'Crear usuario',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterRequest' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Usuario creado',
            content: {
              'application/json': {
                schema: responseEnvelope(
                  { $ref: '#/components/schemas/AuthResponse' },
                  'User created successfully'
                )
              }
            }
          },
          '401': {
            description: 'No autorizado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      },
      get: {
        tags: ['Users'],
        summary: 'Listar usuarios',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'query',
            name: 'userType',
            schema: { type: 'string', enum: ['client', 'provider'] },
            description: 'Filtrar por tipo de usuario'
          }
        ],
        responses: {
          '200': {
            description: 'Listado de usuarios',
            content: {
              'application/json': {
                schema: responseEnvelope({
                  type: 'array',
                  items: { $ref: '#/components/schemas/User' }
                })
              }
            }
          }
        }
      }
    },
    '/api/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Obtener usuario por id',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Usuario encontrado',
            content: {
              'application/json': {
                schema: responseEnvelope({ $ref: '#/components/schemas/User' })
              }
            }
          },
          '404': {
            description: 'Usuario no encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      },
      put: {
        tags: ['Users'],
        summary: 'Actualizar usuario',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateUserRequest' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Usuario actualizado',
            content: {
              'application/json': {
                schema: responseEnvelope(
                  { $ref: '#/components/schemas/User' },
                  'User updated successfully'
                )
              }
            }
          }
        }
      },
      delete: {
        tags: ['Users'],
        summary: 'Eliminar usuario',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Usuario eliminado',
            content: {
              'application/json': {
                schema: responseEnvelope(
                  { $ref: '#/components/schemas/User' },
                  'User deleted successfully'
                )
              }
            }
          }
        }
      }
    }
  }
};
