"use client";

import useSWR from "swr";
import {
  fetchJson,
  serverStatusUrl,
  type ServerStatusResponse,
} from "@/lib/server-api";

export function useServerStatus(serverId: string) {
  return useSWR<ServerStatusResponse>(
    serverStatusUrl(serverId),
    fetchJson<ServerStatusResponse>,
    { refreshInterval: 30_000 },
  );
}