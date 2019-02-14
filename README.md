# mail-server


## Project setup
```
yarn install
```
Change the mysql & email settings found in index.js. By default the project runs on port:3000.

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

The server supports the vuejs client, and allows for storing the registered user email, and returns an error code if the forms aren't complete. See the client.

Todo:
- Implement html email form.
- Email verification.
