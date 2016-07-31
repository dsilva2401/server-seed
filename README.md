Server Seed
===========

A NodeJS based server seed.

## Requirements

#### Development
- gulp
- npm
- [mongodb](https://docs.mongodb.com/manual/installation/)

#### Production
- pm2
- npm
- [mongodb](https://docs.mongodb.com/manual/installation/)

## First setup
```bash
# Node dependencies
npm install

# Typescript definitions
gulp typings:install
```


## Architecture

![Architecture](docs/architecture.png)

- Proxy Server: Intercepts all requests between client and App Server, this is to prevent attacks and improve performance.

- App Server: Contains all business logic.

- DB Server: Database Server.


## File Structure

```bash
./
	package.json
	gulpfile.js
	src/
		core/
			architecture/
				classes/..
				interfaces/..
				..
			app/
				classes/..
				interfaces/..
				..
		setup/
			proxy/..
			app/..
			database/..
			..
		..
```

## Start Servers

#### Development
```bash
gulp serve
```

#### Production
```bash
npm run proxy
npm run app
npm run database
..
```

