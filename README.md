# Solución de Pagos Interledger para Turistas

Un sistema de pagos seguro basado en códigos QR con reglas inteligentes de preautorización diseñado para turistas internacionales que asistan a la Copa Mundial de la FIFA 2026 en México.

## Enlaces

- **Presentación:** _Enlace a la presentación (por agregar)_
- **Demo:** _Enlace a demo en vivo (por agregar)_
- **Repositorio:** https://github.com/mauricio/hackathon-interledger

## Cómo funciona

Con millones de turistas esperados para el Mundial 2026 en México, nuestra solución facilita pagos seguros y sin fricciones mediante códigos QR y tecnología Interledger. Los turistas simplemente escanean el QR del comerciante para autorizar pagos instantáneos que se procesan en tiempo real, eliminando las complicaciones de cambio de divisas, altas comisiones bancarias y limitaciones de tarjetas internacionales.

El corazón de la plataforma es un sistema inteligente de preautorización que protege el patrimonio del usuario mediante reglas personalizables. Los turistas pueden configurar límites de gasto, restricciones por categoría de comercio, montos máximos por transacción y horarios permitidos. Esto es especialmente útil durante su estancia en México, donde los gastos son menos predecibles y existe mayor riesgo de cargos no deseados.

La funcionalidad de lista blanca complementa este sistema de seguridad permitiendo que el turista agregue comercios de confianza de su país de origen que queden exentos de estas reglas restrictivas. De esta manera, mientras viaja, sus pagos cotidianos en casa continúan funcionando sin interrupciones: suscripciones de streaming, pagos recurrentes, tiendas habituales y servicios esenciales no se ven afectados por las medidas de seguridad implementadas específicamente para protegerlo durante el viaje.

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

### Dependencias de Producción

- **Vue 3** (^3.5.22) - Framework progresivo de JavaScript (Licencia MIT)
- **Vue Router** (^4.6.3) - Enrutador oficial para Vue.js (Licencia MIT)
- **Pinia** (^3.0.3) - Gestión de estado para Vue (Licencia MIT)
- **Axios** (^1.13.2) - Cliente HTTP basado en promesas (Licencia MIT)
- **Tailwind CSS** (^4.1.17) - Framework CSS basado en utilidades (Licencia MIT)
- **@tailwindcss/vite** (^4.1.17) - Plugin de Vite para Tailwind CSS (Licencia MIT)
- **qrcode** (^1.5.4) - Generador de códigos QR (Licencia MIT)
- **jsQR** (^1.4.0) - Lector de códigos QR (Licencia Apache 2.0)

### Dependencias de Desarrollo

- **Vite** (^7.1.11) - Herramienta de compilación frontend de próxima generación (Licencia MIT)
- **@vitejs/plugin-vue** (^6.0.1) - Plugin oficial de Vue para Vite (Licencia MIT)
- **ESLint** (^9.37.0) - Utilidad de linting para JavaScript (Licencia MIT)
- **@eslint/js** (^9.37.0) - Reglas de JavaScript para ESLint (Licencia MIT)
- **eslint-plugin-vue** (~10.5.0) - Plugin oficial de ESLint para Vue.js (Licencia MIT)
- **Prettier** (3.6.2) - Formateador de código (Licencia MIT)
- **@vue/eslint-config-prettier** (^10.2.0) - Configuración de ESLint para Prettier (Licencia MIT)
- **vite-plugin-vue-devtools** (^8.0.3) - Plugin de Vite para Vue DevTools (Licencia MIT)
- **globals** (^16.4.0) - Identificadores globales de diferentes entornos JavaScript (Licencia MIT)

Todas las dependencias están licenciadas bajo licencias de código abierto permisivas (MIT, Apache 2.0, BSD, ISC) que son compatibles con nuestra licencia Apache 2.0.

## Miembros del equipo

Diego Guido (diego.guido@exos.mx)
Jose Enrique Gaona (jose-enrique.garcia@exos.mx)
Mauricio Pérez (mauricio.perez@exos.mx)
Roy Salgado (20203tn052@utez.edu.mx)

## Aprendizajes

Durante este hackathon, adquirimos experiencia valiosa trabajando con el protocolo Interledger para pagos transfronterizos y aprendimos cómo integrar flujos complejos de autorización de pagos en una interfaz fácil de usar. Descubrimos la importancia de equilibrar la seguridad con la usabilidad, especialmente al diseñar sistemas para turistas internacionales que pueden tener diferentes niveles de experiencia técnica. El desafío de implementar la generación y escaneo de códigos QR en tiempo real mientras se mantiene una validación segura de transacciones nos enseñó lecciones críticas sobre optimización de rendimiento frontend y gestión de estado en Vue 3.

## Logros

Estamos muy orgullosos de haber implementado con éxito un motor de reglas de preautorización completamente funcional que proporciona control granular sobre los permisos de pago mientras mantiene una experiencia de usuario intuitiva. La funcionalidad de lista blanca agrega una capa adicional de flexibilidad que distingue nuestra solución de los sistemas de pago tradicionales. Además, logramos una integración perfecta entre la tecnología de códigos QR y los rieles de pago de Interledger, creando una prueba de concepto que demuestra la viabilidad en el mundo real de las redes de pago descentralizadas para aplicaciones turísticas. El diseño responsive asegura que la aplicación funcione perfectamente en dispositivos móviles, tabletas y computadoras de escritorio.

## ¿Qué sigue?

Mirando hacia adelante, planeamos integrar características adicionales como soporte multiidioma (español, inglés, francés, alemán y portugués) para acomodar poblaciones turísticas diversas. Nos gustaría implementar notificaciones push para confirmaciones de transacciones y violaciones de reglas, agregar capacidades de pago sin conexión para áreas con conectividad limitada y expandir el panel de comerciantes para proporcionar análisis detallados e historial de pagos. La integración con billeteras digitales populares y el soporte para criptomonedas adicionales ampliaría el alcance de la plataforma. También visualizamos asociaciones con servicios de transporte, hoteles y atracciones turísticas para crear un ecosistema de pagos integral para la Copa Mundial 2026 y más allá.
