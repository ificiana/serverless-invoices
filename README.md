# Serverless Invoices

Serverless Invoices is a free invoicing tool for freelancers and small businesses.

It is open-source and easily extendable. You can use it as a starter kit for more complex systems. Implement your own features, localization, styling
 or integrate with various other systems and API-s.
 
Run it locally or host it yourself.
 
You can always use the latest free version at [invoices.elevate.ee](https://invoices.elevate.ee)

Built with [Vue.js](https://vuejs.org/) and [Bootstrap](https://getbootstrap.com/)

## Features
- Truly serverless - data stored in your browser only, no network requests
- No hosting required - works locally
- Invoices
  - Create & manage invoices
  - Track invoices by status and due date
  - Multiple custom taxes
  - Print to PDF
  - Customizable logo and template, CSS
- Bank accounts
- Clients
  - Create & manage clients
  - Custom fields
- Company details
  - Edit default company details
  - Custom fields
  - Default taxes
- Export & import json data
- Dark and light mode!
- Multilingual
- PWA support 
- Ready-to-go backend adapters
  - [Browser Storage](https://invoices.elevate.ee)
  - [Wordpress](https://wordpress.org/plugins/beautiful-custom-invoices/)
  - Woocommerce (coming soon)
  - Google Drive (coming soon)
  - Custom HTTP API

## Project setup
Requires `node 16.18`

```
npm install
```

### Create app config
Create an app.config.js which can be edited for custom settings.
```
cp src/config/app.config.example.js src/config/app.config.js
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Run with Docker

It is necessary to install Docker before running the following commands.

```
git clone https://github.com/ificiana/serverless-invoices.git
cd serverless-invoices.git
docker build . -t ificiana/serverless-invoices
docker run -p 80:8080 -d --rm ificiana/serverless-invoices
```

It is possible to add an alias in your .bashrc/.zshrc file to launch the app on the fly.

```
echo "alias serverless-invoices='docker run -p 80:8080 -d --rm ificiana/serverless-invoices'" >> ~/.zshrc
source ~/.zshrc
serverless-invoices
```

## Topics
- invoices management
- invoicing solution
- invoice maker
- invoice generator 

## Credits

Originally created by [Moku](https://github.com/mokuappio/serverless-invoices). Maintained by [Ificiana](https://ificiana.github.io/). Released under the MIT license.
