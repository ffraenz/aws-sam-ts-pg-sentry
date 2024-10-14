
# aws-sam-ts-pg-sentry

This repository contains a minimal reproducible example for a Sentry bug report.

It was created using the following init command:

```bash
sam init --app-template hello-world-typescript --name aws-sam-ts-pg-sentry --runtime nodejs20.x --architecture arm64 --dependency-manager npm
```

Tests and test events have been removed.

## Getting started

Install dependencies:

```bash
cd hello-world
npm install
```

Create local `hello-world/.env` from `hello-world/.env.example`. A free [Neon](https://neon.tech) Postgres database and Sentry account can be used.

Push database schema:

```bash
cd hello-world
npm run push
```

Alternatively, the following SQL can be run:

```sql
CREATE TABLE IF NOT EXISTS "numbers" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"number" bigint NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
```

## Build

Build the project locally:

```bash
npm run build
```

## Deploy

Initial deploy:

```bash
sam deploy --config-file samconfig.toml --guided
```

Subsequent deploys:

```bash
npm run deploy
```

## Test

Run the hello world code by triggering a "Test" via the AWS console.
