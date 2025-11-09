# Interledger Payment Solution for Tourists

A secure QR code-based payment system with intelligent pre-authorization rules designed for international tourists attending the 2026 FIFA World Cup in Mexico.

## ACCOUNTS TO USE THE APPLICATION

For the application to work properly, you must log in to wallets dev and our app with the same account

- **MERCHANT**

- username: diego.guido@exos.mx
- password: Uncleturing123\_

- **BUYER**

- username: roy21rasm@gmail.com
- password: Alemania21$21

The MERCHANT must enter and generate a shopping cart by adding products to their cart. Once they have finished adding products, they generate the QR code. The BUYER scans the QR code and follows the flow.

Similarly, the MERCHANT or BUYER can generate rules so that each of their transactions is evaluated and rejected based on specific parameters (amount, days).

## Links

- DRIVE: https://drive.google.com/drive/folders/1_EazxapVfPMB_9BCivi9oitvlemj98Dn?usp=sharing

- **Repository:** https://github.com/mauricio/hackathon-interledger

## How it Works

With millions of tourists expected for the 2026 World Cup in Mexico, our solution facilitates secure and frictionless payments through QR codes and Interledger technology. Tourists simply scan the merchant's QR code to authorize instant payments that are processed in real-time, eliminating the complications of currency exchange, high banking fees, and international card limitations.

The heart of the platform is an intelligent pre-authorization system that protects the user's assets through customizable rules. Users can configure spending limits, restrictions by merchant category, maximum amounts per transaction, and allowed time periods.

The whitelist functionality complements this security system by allowing users to add trusted merchants from their home country who are exempt from these restrictive rules. This way, while traveling, their everyday payments at home continue to work without interruptions: streaming subscriptions, recurring payments, regular stores, and essential services are not affected by the security measures specifically implemented to protect them during travel.

## How to Run

### Prerequisites

- Node.js v22.20.0 or higher
- npm (comes with Node.js)

### WWWalock Application

1. Navigate to each folder's directory (project)

```bash
cd hackathon-interledger-front
cd hackathon-core-ms
cd hackathon-main-ms
cd hackathon-gateway-api
```

And in each project run the following commands:

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. The application will be available at `http://localhost:5173` (or the port shown in your terminal)

For a better understanding of how to use the application, see the demo [here](https://drive.google.com/file/d/1ywTItuVlX0f456P1ULWVV2zCeKbCXwkp/view?usp=sharing), which is a video showing the application's functionality in both directions (merchants and customers), where the merchant offers a series of products ("Products" section of the sidebar) and/or services (top part of the demo video), and the customer side has the option to pay with QR ("Pay" section of the sidebar) for the amount generated in a basket of products and/or services (bottom part of the demo video).

### DEMO Explanation

It is a demonstration of a customer trying to make a purchase that violates a previously configured rule (amounts greater than 500 are rejected), then they disable their rules and make another purchase which is successfully completed.

## Open Source License and Dependencies

This project is licensed under the **Apache 2.0 License** in compliance with the Interledger Hackathon requirements. We represent and warrant that this entry is our original work and does not infringe on any third-party intellectual property rights.

### Front Production Dependencies

- **Vue 3** (^3.5.22) - Progressive JavaScript Framework (MIT License)
- **Vue Router** (^4.6.3) - Official router for Vue.js (MIT License)
- **Pinia** (^3.0.3) - State management for Vue (MIT License)
- **Axios** (^1.13.2) - Promise-based HTTP client (MIT License)
- **Tailwind CSS** (^4.1.17) - Utility-based CSS framework (MIT License)
- **@tailwindcss/vite** (^4.1.17) - Vite plugin for Tailwind CSS (MIT License)
- **qrcode** (^1.5.4) - QR code generator (MIT License)
- **jsQR** (^1.4.0) - QR code reader (Apache 2.0 License)

### Core Production Dependencies

- **@hapi/basic** (^7.0.2) – BSD License
- **@hapi/cookie** (^12.0.1) – BSD License
- **@hapi/hapi** (^21.3.10) – BSD License
- **@hapi/hoek** (^11.0.4) – BSD License
- **@hapi/inert** (^7.1.0) – BSD License
- **@hapi/vision** (^7.0.3) – BSD License
- **async (^3.2.6)** – MIT License
- **hapi-auth-jwt2** (^10.7.0) – ISC License
- **hapi-i18n** (^3.0.1) – MIT License
- **hapi-swagger** (^17.3.0) – MIT License
- **joi** (^17.13.3) – BSD-3-Clause License
- **joi-objectid** (^4.0.2) – MIT License
- **jsonwebtoken** (^9.0.2) – MIT License
- **moment** (^2.30.1) – MIT License
- **mongoose** (^8.19.3) – MIT License
- **pm2** (^5.4.3) – AGPL-3.0 License
- **uuid** (^9.0.1) – MIT License
- **winston** (^3.14.2) – MIT License

### API GATEWAY Production Dependencies

- **@fastify/compress** (^7.0.1) - Compression utilities for Fastify (MIT License)
- **@fastify/cookie** (^9.3.1) - Plugin for handling cookies in Fastify (MIT License)
- **@fastify/cors** (^11.1.0) - CORS plugin for Fastify (MIT License)
- **@fastify/formbody** (^7.4.0) - Form parser for Fastify (MIT License)
- **@fastify/helmet** (^13.0.2) - Security headers for Fastify using Helmet (MIT License)
- **@fastify/multipart** (^9.2.1) - Multipart parser for Fastify (MIT License)
- **@fastify/rate-limit** (^10.3.0) - Rate limiting for Fastify (MIT License)
- **@fastify/static** (^8.2.0) - Plugin for serving static files in Fastify (MIT License)
- **@nest-lab/fastify-multer** (^1.3.0) - Multer integration with Fastify in NestJS (MIT License)
- **@nestjs/axios** (^4.0.1) - Axios-based HTTP module for NestJS (MIT License)
- **@nestjs/common** (^11.1.6) - Common NestJS module (MIT License)
- **@nestjs/config** (^4.0.2) - Configuration module for NestJS (MIT License)
- **@nestjs/core** (^11.1.6) - NestJS core (MIT License)
- **@nestjs/jwt** (^11.0.0) - JWT module for NestJS (MIT License)
- **@nestjs/passport** (^11.0.5) - Passport module for NestJS (MIT License)
- **@nestjs/platform-express** (^11.1.7) - Express platform for NestJS (MIT License)
- **@nestjs/platform-fastify** (^11.1.6) - Fastify platform for NestJS (MIT License)
- **@nestjs/swagger** (^11.2.1) - Swagger module for NestJS (MIT License)
- **@nestjs/throttler** (^6.4.0) - Rate limiter for NestJS (MIT License)
- **axios** (^1.12.2) - Promise-based HTTP client (MIT License)
- **class-transformer** (^0.5.1) - Plain object to class transformation (MIT License)
- **class-validator** (^0.14.2) - Decorator-based validation (MIT License)
- **fastify** (^5.6.1) - Fast web framework for Node.js (MIT License)
- **form-data** (^4.0.4) - FormData builder for Node.js (MIT License)
- **jsonwebtoken** (^9.0.2) - JSON Web Tokens implementation (MIT License)
- **mongoose** (^8.9.0) - Object modeling for MongoDB (Apache-2.0 License)
- **multer** (^2.0.2) - Middleware for handling `multipart/form-data` (MIT License)
- **passport** (^0.7.0) - Authentication middleware for Node.js (MIT License)
- **passport-custom** (^1.1.1) - Custom strategy for Passport (MIT License)
- **passport-jwt** (^4.0.1) - JWT strategy for Passport (MIT License)
- **reflect-metadata** (^0.2.2) - Polyfill for metadata reflection API (Apache-2.0 License)
- **rxjs** (^7.8.2) - Reactive Extensions for JavaScript (Apache-2.0 License)
- **uuid** (^13.0.0) - UUID generator (MIT License)
- **winston** (^3.18.3) - Versatile logger for Node.js (MIT License)

### MAIN MS Production Dependencies

- **@interledger/open-payments** (^7.1.3) - Tools for interacting with the Open Payments API (Apache-2.0 License)
- **@fastify/compress** (^7.0.1) - Compression utilities for Fastify (MIT License)
- **@fastify/cookie** (^9.3.1) - Plugin for handling cookies in Fastify (MIT License)
- **@fastify/cors** (^11.1.0) - CORS plugin for Fastify (MIT License)
- **@fastify/formbody** (^7.4.0) - Form parser for Fastify (MIT License)
- **@fastify/helmet** (^13.0.2) - Security headers for Fastify using Helmet (MIT License)
- **@fastify/multipart** (^8.0.0) - Multipart parser for Fastify (MIT License)
- **@fastify/static** (^8.2.0) - Plugin for serving static files in Fastify (MIT License)
- **@nestjs/common** (^11.1.6) - Common NestJS module (MIT License)
- **@nestjs/config** (^4.0.2) - Configuration module for NestJS (MIT License)
- **@nestjs/core** (^11.1.6) - NestJS core (MIT License)
- **@nestjs/jwt** (^11.0.0) - JWT module for NestJS (MIT License)
- **@nestjs/mongoose** (^11.0.3) - Mongoose module for NestJS (MIT License)
- **@nestjs/passport** (^11.0.5) - Passport module for NestJS (MIT License)
- **@nestjs/platform-fastify** (^11.1.8) - Fastify platform for NestJS (MIT License)
- **@nestjs/swagger** (^11.2.1) - Swagger module for NestJS (MIT License)
- **axios** (^1.12.2) - Promise-based HTTP client (MIT License)
- **class-transformer** (^0.5.1) - Plain object to class transformation (MIT License)
- **class-validator** (^0.14.2) - Decorator-based validation (MIT License)
- **excel4node** (^1.8.2) - Excel file generator for Node.js (MIT License)
- **fastify** (^5.6.1) - Fast web framework for Node.js (MIT License)
- **moment** (^2.29.4) - Library for date parsing, validation, and formatting (MIT License)
- **moment-timezone** (^0.5.45) - Add-on for Moment.js with timezone support (MIT License)
- **mongoose** (^8.19.3) - Object modeling for MongoDB (Apache-2.0 License)
- **passport** (^0.7.0) - Authentication middleware for Node.js (MIT License)
- **passport-jwt** (^4.0.1) - JWT strategy for Passport (MIT License)
- **reflect-metadata** (^0.2.2) - Polyfill for metadata reflection API (Apache-2.0 License)
- **rxjs** (^7.8.2) - Reactive Extensions for JavaScript (Apache-2.0 License)
- **uuid** (^13.0.0) - UUID generator (MIT License)
- **winston** (^3.18.3) - Logger for Node.js (MIT License)

### Front Development Dependencies

- **Vite** (^7.1.11) - Next generation frontend build tool (MIT License)
- **@vitejs/plugin-vue** (^6.0.1) - Official Vue plugin for Vite (MIT License)
- **ESLint** (^9.37.0) - Linting utility for JavaScript (MIT License)
- **@eslint/js** (^9.37.0) - JavaScript rules for ESLint (MIT License)
- **eslint-plugin-vue** (~10.5.0) - Official ESLint plugin for Vue.js (MIT License)
- **Prettier** (3.6.2) - Code formatter (MIT License)
- **@vue/eslint-config-prettier** (^10.2.0) - ESLint configuration for Prettier (MIT License)
- **vite-plugin-vue-devtools** (^8.0.3) - Vite plugin for Vue DevTools (MIT License)
- **globals** (^16.4.0) - Global identifiers from different JavaScript environments (MIT License)

### Core Development Dependencies

- **eslint** (^8.57.0) — MIT License
- **eslint-config-prettier** (^9.1.0) — MIT License
- **eslint-plugin-prettier** (^5.1.3) — MIT License
- **eslint-plugin-vue** (^8.7.1) — MIT License
- **prettier** (^3.2.5) — MIT License

### API GATEWAY Development Dependencies

- **@eslint/js** (^9.37.0) - JavaScript language implementation for ESLint (MIT License)
- **@nestjs/cli** (^11.0.10) - CLI for NestJS (MIT License)
- **@nestjs/schematics** (^11.0.8) - Schematics for NestJS (MIT License)
- **@nestjs/testing** (^11.1.6) - Testing module for NestJS (MIT License)
- **@types/express** (^5.0.3) - Type definitions for Express (MIT License)
- **@types/jest** (^30.0.0) - Type definitions for Jest (MIT License)
- **@types/jsonwebtoken** (^9.0.10) - Type definitions for jsonwebtoken (MIT License)
- **@types/multer** (^2.0.0) - Type definitions for Multer (MIT License)
- **@types/node** (^24.7.0) - Type definitions for Node.js (MIT License)
- **@types/supertest** (^6.0.3) - Type definitions for Supertest (MIT License)
- **@typescript-eslint/eslint-plugin** (^8.46.0) - ESLint plugin for TypeScript (MIT License)
- **@typescript-eslint/parser** (^8.46.0) - ESLint parser for TypeScript (BSD-2-Clause License)
- **dotenv** (^17.2.3) - Loading environment variables from `.env` (BSD-2-Clause License)
- **eslint** (^9.37.0) - JavaScript linting (MIT License)
- **eslint-config-prettier** (^10.1.8) - ESLint configuration for Prettier (MIT License)
- **eslint-plugin-import** (^2.32.0) - ESLint plugin for imports (MIT License)
- **eslint-plugin-prettier** (^5.5.4) - ESLint plugin for Prettier (MIT License)
- **eslint-plugin-security** (^3.0.1) - Security rules for ESLint (MIT License)
- **jest** (^30.2.0) - Testing framework (MIT License)
- **prettier** (^3.6.2) - Opinionated code formatter (MIT License)
- **source-map-support** (^0.5.21) - Support for source maps in stack traces (MIT License)
- **supertest** (^7.1.4) - Library for testing HTTP servers (MIT License)
- **ts-jest** (^29.4.4) - Jest transformer for TypeScript (MIT License)
- **ts-loader** (^9.5.4) - TypeScript loader for Webpack (MIT License)
- **ts-node** (^10.9.2) - TypeScript execution for Node.js (MIT License, with Apache-2.0 parts from TS compiler)
- **tsconfig-paths** (^4.2.0) - Module loading using tsconfig.json paths (MIT License)
- **typescript** (^5.9.3) - TypeScript compiler (Apache-2.0 License)

### MAIN MS Development Dependencies

- **@eslint/js** (^9.37.0) - JavaScript language implementation for ESLint (MIT License)
- **@nestjs/cli** (^11.0.10) - CLI for NestJS (MIT License)
- **@nestjs/schematics** (^11.0.8) - Schematics for NestJS (MIT License)
- **@nestjs/testing** (^11.1.6) - Testing module for NestJS (MIT License)
- **@types/jest** (^30.0.0) - Type definitions for Jest (MIT License)
- **@types/node** (^24.7.0) - Type definitions for Node.js (MIT License)
- **@types/passport-jwt** (^4.0.1) - Type definitions for passport-jwt (MIT License)
- **@types/supertest** (^6.0.3) - Type definitions for Supertest (MIT License)
- **@typescript-eslint/eslint-plugin** (^8.46.0) - ESLint plugin for TypeScript (MIT License)
- **@typescript-eslint/parser** (^8.46.0) - ESLint parser for TypeScript (BSD-2-Clause License)
- **cross-env** (^7.0.3) - Cross-platform environment variable configuration (MIT License)
- **dotenv-cli** (^7.4.2) - CLI tool for dotenv (MIT License)
- **eslint** (^9.37.0) - JavaScript linting (MIT License)
- **eslint-config-prettier** (^10.1.8) - ESLint configuration for Prettier (MIT License)
- **eslint-plugin-import** (^2.32.0) - ESLint plugin for imports (MIT License)
- **eslint-plugin-prettier** (^5.5.4) - ESLint plugin for Prettier (MIT License)
- **eslint-plugin-security** (^3.0.1) - Security rules for ESLint (MIT License)
- **jest** (^30.2.0) - Testing framework (MIT License)
- **prettier** (^3.6.2) - Opinionated code formatter (MIT License)
- **source-map-support** (^0.5.21) - Support for source maps in stack traces (MIT License)
- **supertest** (^7.1.4) - Library for testing HTTP servers (MIT License)
- **ts-jest** (^29.4.4) - Jest transformer for TypeScript (MIT License)
- **ts-loader** (^9.5.4) - TypeScript loader for Webpack (MIT License)
- **ts-node** (^10.9.2) - TypeScript execution for Node.js (MIT License, with Apache-2.0 parts from TS compiler)
- **tsconfig-paths** (^4.2.0) - Module loading using tsconfig.json paths (MIT License)
- **typescript** (^5.9.3) - TypeScript compiler (Apache-2.0 License)

All dependencies are licensed under permissive open source licenses (MIT, Apache 2.0, BSD, ISC) that are compatible with our Apache 2.0 license.

## Team Members

- Diego Guido (diego.guido@exos.mx)
- Jose Enrique Gaona (jose-enrique.garcia@exos.mx)
- Mauricio Pérez (mauricio.perez@exos.mx)
- Roy Salgado (20203tn052@utez.edu.mx)

## Learnings

In just 22 intense hours, we immersed ourselves in the world of Interledger and came out with much more than code. We divided into two teams: backend (where one focused on integrating the Interledger APIs and another on validating pre-authorization rules) and frontend (dividing the views among ourselves). The biggest challenge was designing a pre-authorization architecture that was scalable, fast, and flexible while learning on the fly how grants and transactions work in Interledger. There were definitely moments of frustration, like when we didn't understand what the `interact_ref` parameter was for when trying to debit between accounts, or when we got stuck with the correct way to send payment data. But those "late-night bugs" were what taught us the most about the protocol and the importance of synchronizing bidirectional confirmations. In the end, creating a dynamic QR code with the preset amount to facilitate payment for the user was one of those moments where everything clicked. We went from knowing practically nothing about payments without intermediaries to having a functional system that could really help millions of tourists.

## Achievements

We are very proud to have successfully implemented a fully functional pre-authorization rules engine that provides granular control over payment permissions while maintaining an intuitive user experience. The whitelist functionality adds an additional layer of flexibility that distinguishes our solution from traditional payment systems. Additionally, we achieved seamless integration between QR code technology and Interledger payment rails, creating a proof of concept that demonstrates the real-world viability of decentralized payment networks for tourism applications. The responsive design ensures the application works perfectly on mobile devices, tablets, and desktop computers.

## What's Next?

Looking ahead, we plan to integrate additional features such as multi-language support (Spanish, English, French, German, and Portuguese) to accommodate diverse tourist populations. We would like to implement push notifications for transaction confirmations and rule violations, add offline payment capabilities for areas with limited connectivity, and expand the merchant dashboard to provide detailed analytics and payment history. Integration with popular digital wallets and support for additional cryptocurrencies would expand the platform's reach. We also envision partnerships with transportation services, hotels, and tourist attractions to create a comprehensive payment ecosystem for the 2026 World Cup and beyond.
