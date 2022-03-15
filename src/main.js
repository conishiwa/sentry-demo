import { createApp } from 'vue'
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import App from './App.vue'
import router from './router'
import "@/assets/main.pcss"

const app = createApp(App)
Sentry.init({
    app,
    dsn: "https://3712b3409cd04daab7043083894d8f0c@o1168235.ingest.sentry.io/6260000",
    logErrors: true,
    release: __SENTRY_RELEASE__,
    integrations: [
        new BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            tracingOrigins: ["localhost", "my-site-url.com", /^\//],
        }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

app.use(router).mount('#app')
