# Solución de Pagos Interledger para Turistas

Un sistema de pagos seguro basado en códigos QR con reglas inteligentes de preautorización diseñado para turistas internacionales que asistan a la Copa Mundial de la FIFA 2026 en México.

## CUENTAS PARA OCUPAR LA APLICACIÓN
Para que la aplicación tenga un buen funcionamiento se tendra que iniciar sesión en wallets dev y en nuestra app con la misma cuenta

- **COMERCIO**

- usuario: diego.guido@exos.mx
- contraseña: Uncleturing123_


- **COMPRADOR**

- usuario: roy21rasm@gmail.com
- contraseña: Alemania21$21

El COMERCIO debe entrar y generar un carrito de compra agregando productos a su carrito una vez que haya terminado con los productos genera el código QR, el COMPRADOR escanea el codigo QR y sigue el flujo.

De igual forma el COMERCIO o COMPRADOR podrán generar reglas para que cada una de sus transacciones se evalue y se rechace por parametros especificos (monto, días)


## Enlaces

- **Presentación:** _Enlace a la presentación (por agregar)_
- **Demo:** _Enlace a demo en vivo (por agregar)_
- **Repositorio:** https://github.com/mauricio/hackathon-interledger

## Cómo funciona

Con millones de turistas esperados para el Mundial 2026 en México, nuestra solución facilita pagos seguros y sin fricciones mediante códigos QR y tecnología Interledger. Los turistas simplemente escanean el QR del comerciante para autorizar pagos instantáneos que se procesan en tiempo real, eliminando las complicaciones de cambio de divisas, altas comisiones bancarias y limitaciones de tarjetas internacionales.

El corazón de la plataforma es un sistema inteligente de preautorización que protege el patrimonio del usuario mediante reglas personalizables. Los usuarios pueden configurar límites de gasto, restricciones por categoría de comercio, montos máximos por transacción y horarios permitidos.

La funcionalidad de lista blanca complementa este sistema de seguridad permitiendo que el usuario agregue comercios de confianza de su país de origen que queden exentos de estas reglas restrictivas. De esta manera, mientras viaja, sus pagos cotidianos en casa continúan funcionando sin interrupciones: suscripciones de streaming, pagos recurrentes, tiendas habituales y servicios esenciales no se ven afectados por las medidas de seguridad implementadas específicamente para protegerlo durante el viaje.

## Cómo ejecutar

### Prerrequisitos

- Node.js v22.20.0 o superior
- npm (viene con Node.js)

### Aplicación Frontend

1. Navegar al directorio del frontend:

```bash
cd hackathon-interledger-front
```

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

4. La aplicación estará disponible en `http://localhost:5173` (o el puerto mostrado en tu terminal)

5. **Para simular un pago desde un cliente:** Conéctate a la aplicación usando tu dirección IP local (ej: `http://192.168.1.x:5173`) desde otro dispositivo en la misma red. Esto te permite probar el flujo de pagos con código QR desde un dispositivo móvil u otra computadora.

### Comandos Adicionales

- **Construir para producción:** `npm run build`
- **Vista previa del build de producción:** `npm run preview`
- **Verificar código:** `npm run lint`
- **Formatear código:** `npm run format`

## Licencia de Código Abierto y Dependencias

Este proyecto está licenciado bajo la **Licencia Apache 2.0** en cumplimiento con los requisitos del Hackathon de Interledger. Representamos y garantizamos que esta entrada es nuestro trabajo original y no infringe los derechos de propiedad intelectual de terceros.

### Dependencias de Producción Front

- **Vue 3** (^3.5.22) - Framework progresivo de JavaScript (Licencia MIT)
- **Vue Router** (^4.6.3) - Enrutador oficial para Vue.js (Licencia MIT)
- **Pinia** (^3.0.3) - Gestión de estado para Vue (Licencia MIT)
- **Axios** (^1.13.2) - Cliente HTTP basado en promesas (Licencia MIT)
- **Tailwind CSS** (^4.1.17) - Framework CSS basado en utilidades (Licencia MIT)
- **@tailwindcss/vite** (^4.1.17) - Plugin de Vite para Tailwind CSS (Licencia MIT)
- **qrcode** (^1.5.4) - Generador de códigos QR (Licencia MIT)
- **jsQR** (^1.4.0) - Lector de códigos QR (Licencia Apache 2.0)

### Dependencias de Producción Core

- **@hapi/basic** (^7.0.2) – Licencia BSD
- **@hapi/cookie** (^12.0.1) – Licencia BSD
- **@hapi/hapi** (^21.3.10) – Licencia BSD
- **@hapi/hoek** (^11.0.4) – Licencia BSD
- **@hapi/inert** (^7.1.0) – Licencia BSD
- **@hapi/vision** (^7.0.3) – Licencia BSD
- **async (^3.2.6)** – Licencia MIT 
- **hapi-auth-jwt2** (^10.7.0) – Licencia ISC.
- **hapi-i18n** (^3.0.1) – Licencia MIT 
- **hapi-swagger** (^17.3.0) – Licencia MIT. 
- **joi** (^17.13.3) – Licencia BSD-3-Clause.
- **joi-objectid** (^4.0.2) – Licencia MIT. 
- **jsonwebtoken** (^9.0.2) – Licencia MIT.
- **moment** (^2.30.1) – Licencia MIT.
- **mongoose** (^8.19.3) – Licencia MIT.
- **pm2** (^5.4.3) – Licencia AGPL-3.0. 
- **uuid** (^9.0.1) – Licencia MIT.
- **winston** (^3.14.2) – Licencia MIT.

### Dependencias de Producción API GATEWAY

- **@fastify/compress** (^7.0.1) - Utilidades de compresión para Fastify (Licencia MIT)
- **@fastify/cookie** (^9.3.1) - Plugin para manejar cookies en Fastify (Licencia MIT)
- **@fastify/cors** (^11.1.0) - Plugin para CORS en Fastify (Licencia MIT)
- **@fastify/formbody** (^7.4.0) - Parser para formularios en Fastify (Licencia MIT)
- **@fastify/helmet** (^13.0.2) - Headers de seguridad para Fastify usando Helmet (Licencia MIT)
- **@fastify/multipart** (^9.2.1) - Parser para multipart en Fastify (Licencia MIT)
- **@fastify/rate-limit** (^10.3.0) - Limitación de tasa para Fastify (Licencia MIT)
- **@fastify/static** (^8.2.0) - Plugin para servir archivos estáticos en Fastafe Fastify (Licencia MIT)
- **@nest-lab/fastify-multer** (^1.3.0) - Integración de Multer con Fastify en NestJS (Licencia MIT)
- **@nestjs/axios** (^4.0.1) - Módulo HTTP basado en Axios para NestJS (Licencia MIT)
- **@nestjs/common** (^11.1.6) - Módulo común de NestJS (Licencia MIT)
- **@nestjs/config** (^4.0.2) - Módulo de configuración para NestJS (Licencia MIT)
- **@nestjs/core** (^11.1.6) - Núcleo de NestJS (Licencia MIT)
- **@nestjs/jwt** (^11.0.0) - Módulo JWT para NestJS (Licencia MIT)
- **@nestjs/passport** (^11.0.5) - Módulo Passport para NestJS (Licencia MIT)
- **@nestjs/platform-express** (^11.1.7) - Plataforma Express para NestJS (Licencia MIT)
- **@nestjs/platform-fastify** (^11.1.6) - Plataforma Fastify para NestJS (Licencia MIT)
- **@nestjs/swagger** (^11.2.1) - Módulo Swagger para NestJS (Licencia MIT)
- **@nestjs/throttler** (^6.4.0) - Limitador de tasa para NestJS (Licencia MIT)
- **axios** (^1.12.2) - Cliente HTTP basado en promesas (Licencia MIT)
- **class-transformer** (^0.5.1) - Transformación de objetos planos a clases (Licencia MIT)
- **class-validator** (^0.14.2) - Validación basada en decoradores (Licencia MIT)
- **fastify** (^5.6.1) - Framework web rápido para Node.js (Licencia MIT)
- **form-data** (^4.0.4) - Constructor de FormData para Node.js (Licencia MIT)
- **jsonwebtoken** (^9.0.2) - Implementación de JSON Web Tokens (Licencia MIT)
- **mongoose** (^8.9.0) - Modelado de objetos para MongoDB (Licencia Apache-2.0)
- **multer** (^2.0.2) - Middleware para manejo de `multipart/form-data` (Licencia MIT)
- **passport** (^0.7.0) - Middleware de autenticación para Node.js (Licencia MIT)
- **passport-custom** (^1.1.1) - Estrategia personalizada para Passport (Licencia MIT)
- **passport-jwt** (^4.0.1) - Estrategia JWT para Passport (Licencia MIT)
- **reflect-metadata** (^0.2.2) - Polyfill para metadata reflection API (Licencia Apache-2.0)
- **rxjs** (^7.8.2) - Reactive Extensions para JavaScript (Licencia Apache-2.0)
- **uuid** (^13.0.0) - Generador de UUIDs (Licencia MIT)
- **winston** (^3.18.3) - Logger versátil para Node.js (Licencia MIT)

### Dependencias de Producción MAIN MS

- **@interledger/open-payments** (^7.1.3) - Herramientas para interactuar con la API de Open Payments (Licencia Apache-2.0)
- **@fastify/compress** (^7.0.1) - Utilidades de compresión para Fastify (Licencia MIT)
- **@fastify/cookie** (^9.3.1) - Plugin para manejar cookies en Fastify (Licencia MIT)
- **@fastify/cors** (^11.1.0) - Plugin para CORS en Fastify (Licencia MIT)
- **@fastify/formbody** (^7.4.0) - Parser para formularios en Fastify (Licencia MIT)
- **@fastify/helmet** (^13.0.2) - Headers de seguridad para Fastify usando Helmet (Licencia MIT)
- **@fastify/multipart** (^8.0.0) - Parser para multipart en Fastify (Licencia MIT)
- **@fastify/static** (^8.2.0) - Plugin para servir archivos estáticos en Fastify (Licencia MIT)
- **@nestjs/common** (^11.1.6) - Módulo común de NestJS (Licencia MIT)
- **@nestjs/config** (^4.0.2) - Módulo de configuración para NestJS (Licencia MIT)
- **@nestjs/core** (^11.1.6) - Núcleo de NestJS (Licencia MIT)
- **@nestjs/jwt** (^11.0.0) - Módulo JWT para NestJS (Licencia MIT)
- **@nestjs/mongoose** (^11.0.3) - Módulo Mongoose para NestJS (Licencia MIT)
- **@nestjs/passport** (^11.0.5) - Módulo Passport para NestJS (Licencia MIT)
- **@nestjs/platform-fastify** (^11.1.8) - Plataforma Fastify para NestJS (Licencia MIT)
- **@nestjs/swagger** (^11.2.1) - Módulo Swagger para NestJS (Licencia MIT)
- **axios** (^1.12.2) - Cliente HTTP basado en promesas (Licencia MIT)
- **class-transformer** (^0.5.1) - Transformación de objetos planos a clases (Licencia MIT)
- **class-validator** (^0.14.2) - Validación basada en decoradores (Licencia MIT)
- **excel4node** (^1.8.2) - Generador de archivos Excel para Node.js (Licencia MIT)
- **fastify** (^5.6.1) - Framework web rápido para Node.js (Licencia MIT)
- **moment** (^2.29.4) - Biblioteca para parsing, validación y formateo de fechas (Licencia MIT)
- **moment-timezone** (^0.5.45) - Add-on para Moment.js con soporte de zonas horarias (Licencia MIT)
- **mongoose** (^8.19.3) - Modelado de objetos para MongoDB (Licencia Apache-2.0)
- **passport** (^0.7.0) - Middleware de autenticación para Node.js (Licencia MIT)
- **passport-jwt** (^4.0.1) - Estrategia JWT para Passport (Licencia MIT)
- **reflect-metadata** (^0.2.2) - Polyfill para metadata reflection API (Licencia Apache-2.0)
- **rxjs** (^7.8.2) - Reactive Extensions para JavaScript (Licencia Apache-2.0)
- **uuid** (^13.0.0) - Generador de UUIDs (Licencia MIT)
- **winston** (^3.18.3) - Logger para Node.js (Licencia MIT)



### Dependencias de Desarrollo Front

- **Vite** (^7.1.11) - Herramienta de compilación frontend de próxima generación (Licencia MIT)
- **@vitejs/plugin-vue** (^6.0.1) - Plugin oficial de Vue para Vite (Licencia MIT)
- **ESLint** (^9.37.0) - Utilidad de linting para JavaScript (Licencia MIT)
- **@eslint/js** (^9.37.0) - Reglas de JavaScript para ESLint (Licencia MIT)
- **eslint-plugin-vue** (~10.5.0) - Plugin oficial de ESLint para Vue.js (Licencia MIT)
- **Prettier** (3.6.2) - Formateador de código (Licencia MIT)
- **@vue/eslint-config-prettier** (^10.2.0) - Configuración de ESLint para Prettier (Licencia MIT)
- **vite-plugin-vue-devtools** (^8.0.3) - Plugin de Vite para Vue DevTools (Licencia MIT)
- **globals** (^16.4.0) - Identificadores globales de diferentes entornos JavaScript (Licencia MIT)

### Dependencias de Desarrollo Core

- **eslint** (^8.57.0) — Licencia MIT. Archivo 
- **eslint-config-prettier** (^9.1.0) — Licencia MIT. 
- **eslint-plugin-prettier** (^5.1.3) — Licencia MIT. 
- **eslint-plugin-vue** (^8.7.1) — Licencia MIT. 
- **prettier** (^3.2.5) — Licencia MIT.

### Dependencias de Desarrollo API GATEWAY

- **@eslint/js** (^9.37.0) - Implementación del lenguaje JavaScript para ESLint (Licencia MIT)
- **@nestjs/cli** (^11.0.10) - CLI para NestJS (Licencia MIT)
- **@nestjs/schematics** (^11.0.8) - Schematics para NestJS (Licencia MIT)
- **@nestjs/testing** (^11.1.6) - Módulo de testing para NestJS (Licencia MIT)
- **@types/express** (^5.0.3) - Definiciones de tipos para Express (Licencia MIT)
- **@types/jest** (^30.0.0) - Definiciones de tipos para Jest (Licencia MIT)
- **@types/jsonwebtoken** (^9.0.10) - Definiciones de tipos para jsonwebtoken (Licencia MIT)
- **@types/multer** (^2.0.0) - Definiciones de tipos para Multer (Licencia MIT)
- **@types/node** (^24.7.0) - Definiciones de tipos para Node.js (Licencia MIT)
- **@types/supertest** (^6.0.3) - Definiciones de tipos para Supertest (Licencia MIT)
- **@typescript-eslint/eslint-plugin** (^8.46.0) - Plugin de ESLint para TypeScript (Licencia MIT)
- **@typescript-eslint/parser** (^8.46.0) - Parser de ESLint para TypeScript (Licencia BSD-2-Clause)
- **dotenv** (^17.2.3) - Carga de variables de entorno desde `.env` (Licencia BSD-2-Clause)
- **eslint** (^9.37.0) - Linting de JavaScript (Licencia MIT)
- **eslint-config-prettier** (^10.1.8) - Configuración de ESLint para Prettier (Licencia MIT)
- **eslint-plugin-import** (^2.32.0) - Plugin de ESLint para imports (Licencia MIT)
- **eslint-plugin-prettier** (^5.5.4) - Plugin de ESLint para Prettier (Licencia MIT)
- **eslint-plugin-security** (^3.0.1) - Reglas de seguridad para ESLint (Licencia MIT)
- **jest** (^30.2.0) - Framework de testing (Licencia MIT)
- **prettier** (^3.6.2) - Formateador de código opinionado (Licencia MIT)
- **source-map-support** (^0.5.21) - Soporte para source maps en stack traces (Licencia MIT)
- **supertest** (^7.1.4) - Biblioteca para testing de servidores HTTP (Licencia MIT)
- **ts-jest** (^29.4.4) - Transformer de Jest para TypeScript (Licencia MIT)
- **ts-loader** (^9.5.4) - Loader de TypeScript para Webpack (Licencia MIT)
- **ts-node** (^10.9.2) - Ejecución de TypeScript en Node.js (Licencia MIT, con partes Apache-2.0 del compilador TS)
- **tsconfig-paths** (^4.2.0) - Carga de módulos usando paths de tsconfig.json (Licencia MIT)
- **typescript** (^5.9.3) - Compilador de TypeScript (Licencia Apache-2.0)

### Dependencias de Desarrollo MAIN MS

- **@eslint/js** (^9.37.0) - Implementación del lenguaje JavaScript para ESLint (Licencia MIT)
- **@nestjs/cli** (^11.0.10) - CLI para NestJS (Licencia MIT)
- **@nestjs/schematics** (^11.0.8) - Schematics para NestJS (Licencia MIT)
- **@nestjs/testing** (^11.1.6) - Módulo de testing para NestJS (Licencia MIT)
- **@types/jest** (^30.0.0) - Definiciones de tipos para Jest (Licencia MIT)
- **@types/node** (^24.7.0) - Definiciones de tipos para Node.js (Licencia MIT)
- **@types/passport-jwt** (^4.0.1) - Definiciones de tipos para passport-jwt (Licencia MIT)
- **@types/supertest** (^6.0.3) - Definiciones de tipos para Supertest (Licencia MIT)
- **@typescript-eslint/eslint-plugin** (^8.46.0) - Plugin de ESLint para TypeScript (Licencia MIT)
- **@typescript-eslint/parser** (^8.46.0) - Parser de ESLint para TypeScript (Licencia BSD-2-Clause)
- **cross-env** (^7.0.3) - Configuración de variables de entorno cross-platform (Licencia MIT)
- **dotenv-cli** (^7.4.2) - Herramienta CLI para dotenv (Licencia MIT)
- **eslint** (^9.37.0) - Linting de JavaScript (Licencia MIT)
- **eslint-config-prettier** (^10.1.8) - Configuración de ESLint para Prettier (Licencia MIT)
- **eslint-plugin-import** (^2.32.0) - Plugin de ESLint para imports (Licencia MIT)
- **eslint-plugin-prettier** (^5.5.4) - Plugin de ESLint para Prettier (Licencia MIT)
- **eslint-plugin-security** (^3.0.1) - Reglas de seguridad para ESLint (Licencia MIT)
- **jest** (^30.2.0) - Framework de testing (Licencia MIT)
- **prettier** (^3.6.2) - Formateador de código opinionado (Licencia MIT)
- **source-map-support** (^0.5.21) - Soporte para source maps en stack traces (Licencia MIT)
- **supertest** (^7.1.4) - Biblioteca para testing de servidores HTTP (Licencia MIT)
- **ts-jest** (^29.4.4) - Transformer de Jest para TypeScript (Licencia MIT)
- **ts-loader** (^9.5.4) - Loader de TypeScript para Webpack (Licencia MIT)
- **ts-node** (^10.9.2) - Ejecución de TypeScript en Node.js (Licencia MIT, con partes Apache-2.0 del compilador TS)
- **tsconfig-paths** (^4.2.0) - Carga de módulos usando paths de tsconfig.json (Licencia MIT)
- **typescript** (^5.9.3) - Compilador de TypeScript (Licencia Apache-2.0)



Todas las dependencias están licenciadas bajo licencias de código abierto permisivas (MIT, Apache 2.0, BSD, ISC) que son compatibles con nuestra licencia Apache 2.0.

## Miembros del equipo

- Diego Guido (diego.guido@exos.mx)
- Jose Enrique Gaona (jose-enrique.garcia@exos.mx)
- Mauricio Pérez (mauricio.perez@exos.mx)
- Roy Salgado (20203tn052@utez.edu.mx)

## Aprendizajes

En solo 22 horas intensas, nos sumergimos en el mundo de Interledger y salimos con mucho más que código. Nos dividimos en dos equipos: backend (donde uno se enfocó en integrar las APIs de Interledger y otro en validar las reglas de pre-autorización) y frontend (dividiendo las vistas entre nosotros). El mayor reto fue diseñar una arquitectura de pre-autorización que fuera escalable, rápida y flexible, mientras aprendíamos sobre la marcha cómo funcionan los grants y las transacciones en Interledger. Definitivamente hubo momentos de frustración, como cuando no entendíamos para qué servía el parámetro `interact_ref` al intentar debitar entre cuentas, o cuando nos trabamos con la forma correcta de enviar los datos de pago. Pero esos "bugs de madrugada" fueron los que más nos enseñaron sobre el protocolo y la importancia de sincronizar confirmaciones bidireccionales. Al final, crear un QR dinámico con el monto preestablecido para facilitar el pago al usuario fue uno de esos momentos donde todo hizo click. Pasamos de no conocer prácticamente nada de pagos sin intermediarios a tener un sistema funcional que realmente podría ayudar a millones de turistas.

## Logros

Estamos muy orgullosos de haber implementado con éxito un motor de reglas de preautorización completamente funcional que proporciona control granular sobre los permisos de pago mientras mantiene una experiencia de usuario intuitiva. La funcionalidad de lista blanca agrega una capa adicional de flexibilidad que distingue nuestra solución de los sistemas de pago tradicionales. Además, logramos una integración perfecta entre la tecnología de códigos QR y los rieles de pago de Interledger, creando una prueba de concepto que demuestra la viabilidad en el mundo real de las redes de pago descentralizadas para aplicaciones turísticas. El diseño responsive asegura que la aplicación funcione perfectamente en dispositivos móviles, tabletas y computadoras de escritorio.

## ¿Qué sigue?

Mirando hacia adelante, planeamos integrar características adicionales como soporte multiidioma (español, inglés, francés, alemán y portugués) para acomodar poblaciones turísticas diversas. Nos gustaría implementar notificaciones push para confirmaciones de transacciones y violaciones de reglas, agregar capacidades de pago sin conexión para áreas con conectividad limitada y expandir el panel de comerciantes para proporcionar análisis detallados e historial de pagos. La integración con billeteras digitales populares y el soporte para criptomonedas adicionales ampliaría el alcance de la plataforma. También visualizamos asociaciones con servicios de transporte, hoteles y atracciones turísticas para crear un ecosistema de pagos integral para la Copa Mundial 2026 y más allá.


DRIVE: https://drive.google.com/drive/folders/1_EazxapVfPMB_9BCivi9oitvlemj98Dn?usp=sharing
