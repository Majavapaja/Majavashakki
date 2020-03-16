![Deploy to production](https://github.com/Majavapaja/Majavashakki/workflows/Deploy%20to%20production/badge.svg) ![Dependencies](https://david-dm.org/majavapaja/Majavashakki/status.svg)
![Code style](https://img.shields.io/badge/code%20style-none-brightgreen)

# Majavashakki
The amazing Node.js sequel to the fantastic MaJAVAshakki (for Java). With this new version we are planning to add several new bugs and more unreadable code!

## Browser compatibility

Majavashakki doesn't guarantee support for any specific browser. Chrome and Firefox may work.

## Business hours
Mon-Fri 17-18

Sat 15-16

Sun Closed

### Install Node

The officially supported version is 10.6 (64-bit).

### Install MongoDB using Vagrant ###

1. Install Virtual Box and Vagrant
2. Run `vagrant up` inside `local-services` directory

### [MongoDB with Docker Compose](/local-services/docker)

### Install local MongoDB as windows service ###
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#get-mongodb-community-edition

1. Created folders:

C:\MongoData
C:\MongoData\db
C:\MongoData\log

2. Created yaml configuration file:

C:\MongoData\mongod.cfg
content => (
systemLog:
 destination: file
 path: C:\MongoData\log\mongod.log
storage:
 dbPath: C:\MongoData\db
 )

 3. Run from administrator cmd (from mongo installation bin folder or if env var exists)

 mongod.exe --config "C:\MongoData\mongod.cfg" --install

## Environment variables
### Required
MajavashakkiSessionSecret

### Optional
MajavashakkiMongoConnectionString

MajavaMongoPassword

MajavashakkiFbClientId

MajavashakkiFbSecret
