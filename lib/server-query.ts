import "server-only";

import { createValveProtocol } from "@srvquery/protocol-valve";
import { SERVERS, type Server } from "@/lib/servers";

export const SERVER_INFO_QUERY_TIMEOUT_MS = 1500;
export const SERVER_MODS_QUERY_TIMEOUT_MS = 5000;

export function getServerById(id: string) {
  return SERVERS.find((server) => server.id === id);
}

export function createServerProtocol(server: Server, timeout: number) {
  return createValveProtocol({
    host: server.address.ip,
    port: server.address.ports.query,
    timeout,
    retry: { retries: 1 },
  });
}