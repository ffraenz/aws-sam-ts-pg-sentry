
# aws-sam-ts-pg-sentry

This repository contains a minimal reproducible example for a [Sentry bug report](https://github.com/getsentry/sentry-javascript/issues/13975).

It was created using the following init command and [template](https://github.com/aws/aws-sam-cli-app-templates/tree/master/nodejs20.x/hello-ts):

```bash
sam init --app-template hello-world-typescript --name aws-sam-ts-pg-sentry --runtime nodejs20.x --architecture arm64 --dependency-manager npm
```

Tests and test events have been removed.

Functions:

- `function-drizzle-pg` - Using packages Drizzle.js and pg.
- `function-pg` - Using package pg.

## Getting started

Install dependencies:

```bash
cd function-drizzle-pg
npm install
cd ..
cd function-pg
npm install
```

Create local `function-drizzle-pg/.env` from `function-drizzle-pg/.env.example`. A free [Neon](https://neon.tech) Postgres database and Sentry account can be used.

Push database schema:

```bash
cd function-drizzle-pg
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

Trigger a manual test of the Lambda in the AWS console.
