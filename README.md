# Demo.

Simple app.

# CONFIGURATION

Configuration is set to `config.json`.
Install MySQL parameters and port.

# INSTALL

```
npm run init
```

# RUN

```
npm start
```

# API

**GET /users** - get all users

**GET /user/:id** - get user

**POST /user** - add user

__params__  

```
{
    "name": "test",
    "email": "test",
    "phone": "test",
    "address": "test",
    "avatar": "upload_432e954e5cb189c60b50aaf48d459904"
}
```

**PUT /user** - edit user

__params__  

```
{
    "uid": "54",
    "name": "test",
    "email": "test",
    "phone": "test",
    "address": "test",
    "avatar": "upload_432e954e5cb189c60b50aaf48d459904"
}
```

**DELETE /user** - delete user

__params__  

```
{
    "id": "46"
}
```
