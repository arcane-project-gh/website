export type ServerStatusResponse =
  | {
      online: true;
      name?: string;
      players?: number;
      maxPlayers?: number;
    }
  | { online: false };

export type ServerMod = {
  name: string;
  id: string;
};

export type ServerModsResponse = {
  mods: ServerMod[];
};

export function serverStatusUrl(serverId: string) {
  return `/api/servers/${encodeURIComponent(serverId)}`;
}

export function serverModsUrl(serverId: string) {
  return `${serverStatusUrl(serverId)}/mods`;
}

export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json() as Promise<T>;
}