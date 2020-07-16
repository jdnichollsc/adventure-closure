# Certificates
Create a private key and a certificate using `openssl`:

```sh
openssl genrsa 2048 > key.pem
openssl req -x509 -days 1000 -new -key key.pem -out cert.pem
```