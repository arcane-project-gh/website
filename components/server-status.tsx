"use client";

import { useEffect, useState } from "react";
import { ChartNoAxesColumnIncreasingIcon } from "lucide-react";
import { Popover } from "@base-ui/react/popover";

type ServerStatusProps = {
  serverId: string;
};

type ServerStatusResponse = {
  online: boolean;
  name?: string;
  players?: number;
  maxPlayers?: number;
};

export default function ServerStatus({ serverId }: ServerStatusProps) {
  const [status, setStatus] = useState<ServerStatusResponse | null>();

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;

    const updateStatus = async () => {
      try {
        const response = await fetch(`/api/servers/${serverId}`, {
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Server query failed");

        const nextStatus = (await response.json()) as ServerStatusResponse;
        if (active) setStatus(nextStatus.online ? nextStatus : null);
      } catch {
        if (active) setStatus(null);
      } finally {
        if (active) timer = setTimeout(updateStatus, 30_000);
      }
    };

    void updateStatus();
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [serverId]);

  const isOnline = status?.online === true;
  const playerCount = isOnline
    ? `${status.players ?? 0}/${status.maxPlayers ?? 0}`
    : status === null
      ? "Offline"
      : "...";
  const serverName = status?.name ?? (status === null ? "Server offline" : `Querying ${serverId}...`);

  return (
    <div className="flex h-full min-w-0 flex-1 items-center justify-between gap-4 pr-2 pl-4">
      <div className="min-w-0 flex-1">
        <Popover.Root>
          <Popover.Trigger
            className="block max-w-full cursor-pointer truncate text-left font-mono text-xs"
            aria-label={`Show full server name: ${serverName}`}
          >
            {serverName}
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner side="top" sideOffset={8}>
              <Popover.Popup className="z-50 max-w-64 border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md">
                <Popover.Description>{serverName}</Popover.Description>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      </div>
      <div
        className="flex shrink-0 items-center gap-1 border-l h-full px-2"
        aria-label={isOnline ? `${playerCount} players online` : playerCount}
        aria-live="polite"
      >
        <ChartNoAxesColumnIncreasingIcon
          className={`size-3 ${isOnline ? "text-emerald-500" : "text-muted-foreground"}`}
        />
        <p className="font-mono text-xs">{status == null ? "../.." : playerCount }</p>
      </div>
    </div>
  );
}