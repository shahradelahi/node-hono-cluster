import type {
  createServer,
  IncomingMessage,
  Server,
  ServerOptions as ServerOptions$1,
  ServerResponse,
} from 'node:http';
import type {
  createSecureServer,
  createServer as createServer$2,
  Http2SecureServer,
  Http2Server,
  Http2ServerRequest,
  Http2ServerResponse,
  SecureServerOptions,
  ServerOptions as ServerOptions$3,
} from 'node:http2';
import type { createServer as createServer$1, ServerOptions as ServerOptions$2 } from 'node:https';
import type { Context, Env } from 'hono';

type HttpBindings = {
  incoming: IncomingMessage;
  outgoing: ServerResponse;
};

type Http2Bindings = {
  incoming: Http2ServerRequest;
  outgoing: Http2ServerResponse;
};

export type FetchCallback = (
  request: Request,
  env: HttpBindings | Http2Bindings
) => Promise<unknown> | unknown;

export type ServerType = Server | Http2Server | Http2SecureServer;

export type createHttpOptions = {
  serverOptions?: ServerOptions$1;
  createServer?: typeof createServer;
};

export type createHttpsOptions = {
  serverOptions?: ServerOptions$2;
  createServer?: typeof createServer$1;
};

export type createHttp2Options = {
  serverOptions?: ServerOptions$3;
  createServer?: typeof createServer$2;
};

export type createSecureHttp2Options = {
  serverOptions?: SecureServerOptions;
  createServer?: typeof createSecureServer;
};

export type ServerOptions =
  | createHttpOptions
  | createHttpsOptions
  | createHttp2Options
  | createSecureHttp2Options;

export type Options = {
  fetch: FetchCallback;
  overrideGlobalObjects?: boolean;
  port?: number;
  hostname?: string;

  /**
   * Number of workers to spawn. Set to `true` to spawn as many workers as there are CPU cores and `false` to disable spawning workers.
   * @default The number of available cores.
   */
  workers?: number | boolean;
} & ServerOptions;

export type ServeStaticOptions<E extends Env = Env> = {
  /**
   * Root path, relative to current working directory from which the app was started. Absolute paths are not supported.
   */
  root?: string;
  path?: string;
  index?: string;
  precompressed?: boolean;
  rewriteRequestPath?: (path: string) => string;
  onFound?: (path: string, c: Context<E>) => void | Promise<void>;
  onNotFound?: (path: string, c: Context<E>) => void | Promise<void>;
};
