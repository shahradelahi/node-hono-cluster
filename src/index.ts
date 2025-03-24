import cluster from 'node:cluster';
import { AddressInfo } from 'node:net';
import { availableParallelism } from 'node:os';
import process from 'node:process';
import { serve as honoServe } from '@hono/node-server';
import { serveStatic as honoServeStatic } from '@hono/node-server/serve-static';
import { type MiddlewareHandler } from 'hono';

import type { Options, ServerType, ServeStaticOptions } from './typings';

// -- Exported ------------------------

/**
 * Starts a clustered or single-process server.
 *
 * @example
 *
 * // -- server.ts
 *
 * import { serve } from 'hono-cluster';
 * import { App } from './app';
 *
 * serve({
 *   fetch: App.fetch,
 *   port: 3000,
 *   workers: true, // `true` to spawn as many workers as there are CPU cores.
 * }, (_server, info) => {
 *   console.log(`Listening on http://${info.address}:${info.port}`);
 * });
 *
 * @param options Server configuration options.
 * @param listeningListener Optional callback for server start event.
 */
export function serve(
  options: Options,
  listeningListener?: ((server: ServerType, info: AddressInfo) => void) | undefined
): void {
  const { workers, ...opts } = options;

  if (cluster.isPrimary) {
    const numCPUs = availableParallelism();
    const numWorkers = typeof workers === 'boolean' ? (workers ? undefined : 1) : workers;

    if (numWorkers && numWorkers > numCPUs) {
      process.emitWarning(
        `Requested number of workers (${workers}) exceeds available CPU cores (${numCPUs}). ` +
          `Using more workers than there are CPU cores doesn’t provide significant performance benefits.`
      );
    }

    for (let i = 0; i < Math.max(1, numWorkers ?? numCPUs); i++) {
      cluster.fork();
    }

    cluster.on('exit', () => {
      cluster.fork();
    });
  } else {
    const server = honoServe(opts, (info) => {
      if (listeningListener) {
        listeningListener(server, info);
      }
    });
  }
}

/**
 * Middleware for serving static files.
 *
 * @example
 *
 * import { serveStatic } from 'hono-cluster';
 *
 * const app = new Hono();
 *
 * app.use('*', serveStatic({ root: './public' }));
 *
 * @param options Static file serving options.
 * @returns Middleware handler.
 */
export function serveStatic(options: ServeStaticOptions): MiddlewareHandler {
  return honoServeStatic(options);
}

// -- Typings -------------------------

export type { Options, ServerType, ServeStaticOptions } from './typings';
