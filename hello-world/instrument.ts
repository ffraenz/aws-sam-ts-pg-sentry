import * as Sentry from '@sentry/aws-serverless';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [nodeProfilingIntegration(), Sentry.postgresIntegration()],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
    debug: true,
});
