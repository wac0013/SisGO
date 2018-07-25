# SisGO

Sistema de gestão de odontológica, sistema destinados para clínicas odontológicas e cirurgiões dentista

## Tutorial para gerar certificado

```sh
$ mkdir certificado
```

```sh
$ cd certificado
```

```sh
$ openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
...
```

```sh
$ openssl rsa -passin pass:x -in server.pass.key -out server.key
writing RSA key
```

```sh
$ openssl req -new -key server.key -out server.csr
...
Country Name (2 letter code) [AU]:US
State or Province Name (full name) [Some-State]:California
...
A challenge password []:
...
```

```sh
$ openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
```

## Referências

[HTTP2-node](https://webapplog.com/http2-node/)