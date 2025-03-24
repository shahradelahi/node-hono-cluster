# hono-cluster

[![CI](https://github.com/shahradelahi/node-hono-cluster/actions/workflows/ci.yml/badge.svg)](https://github.com/shahradelahi/node-hono-cluster/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/hono-cluster.svg)](https://www.npmjs.com/package/hono-cluster)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](/LICENSE)
[![Install Size](https://packagephobia.com/badge?p=hono-cluster)](https://packagephobia.com/result?p=hono-cluster)

**hono-cluster** is a lightweight module for running [Hono](https://hono.dev/) applications with optional clustering support. It allows you to efficiently utilize multiple CPU cores by spawning worker processes.

---

- [Installation](#-installation)
- [Usage](#-usage)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#license)

## 📦 Installation

```bash
npm install hono-cluster
```

## 📖 Usage

#### Starting a Clustered Server

```typescript
// -- server.ts

import { serve } from 'hono-cluster';

import { App } from './app';

serve(
  {
    fetch: App.fetch,
    port: 3000,
    workers: true, // Use all available CPU cores
  },
  (_server, info) => {
    console.log(`Listening on http://${info.address}:${info.port}`);
  }
);
```

#### Serving Static Files

```typescript
import { Hono } from 'hono';
import { serveStatic } from 'hono-cluster';

const App = new Hono();

App.use('*', serveStatic({ root: './public' }));

// ...
```

## 📚 Documentation

For all configuration options, please see [the API docs](https://www.jsdocs.io/package/hono-cluster).

## 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise issues on [GitHub](https://github.com/shahradelahi/node-hono-cluster)

Thanks again for your support, it is much appreciated! 🙏

## License

[MIT](/LICENSE) © [Shahrad Elahi](https://github.com/shahradelahi) and [contributors](https://github.com/shahradelahi/node-hono-cluster/graphs/contributors).
