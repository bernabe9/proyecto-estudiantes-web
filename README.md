# Proyecto de grado - App estudiantes :notebook: :uk: :school_satchel:

## Comandos
1. **Correr la app**. `yarn start`
2. **Ejecutar la app**. `yarn build`
3. **Correr linter**. `yarn lint`
4. **Correr electron**. `yarn dev`
5. **Release electron**. `yarn release`
5. **Release electron linux**. `yarn release:linux`

## Instalación
1. **Clonar repositorio:** `git clone https://github.com/bernabe9/proyecto-estudiantes-web.git`
2. **Instalar dependencias:** `yarn`
3. **Agregar variables de entorno**

Crear los file de variables de entorno y ubicarlos en la carpeta raiz.(.env.dev, .env.staging and .env.prod):

  `.env.dev` ejemplo:
  ```
    API_URL=http://your-api-url.com
    ENABLE_PWA=true
  ```

4. **Correr la app:** `yarn start`

## Correr scripts con diferentes environments
Para cambiar el conjunto de variables de entorno par aun escript es necesario correr `ENV=my_environment` antes del script.

Por ejemplo: `ENV=staging yarn build`

## Configuración
**Instalar Node [version 9.8](https://nodejs.org)**

**Instalar [Yarn](https://yarnpkg.com/en/docs/install)**

## Progressive web app
Para activar PWA, cambie a `true` la variable de entorno `ENABLE_PWA` en su dot file.

## Hacer deploy a AWS S3
1. **Agregue las siguientes variables de entorno para cada .env** AWS_BUCKET, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
2. **Corra el comando para hacer un deploy con un environment especifico** `ENV=your_environment yarn deploy`

## Deploying to Heroku
1. **Add all the environment variables in .env to Heroku**
2. **Add the env variable NPM_CONFIG_PRODUCTION=false to Heroku**
2. **Deploy your branch to Heroku**
