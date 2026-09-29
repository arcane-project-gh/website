"use client";

import { ArrowUpRight, ChartNoAxesColumnIncreasingIcon } from "lucide-react";
import { Popover } from "@base-ui/react/popover";
import type { ServerStatusResponse } from "@/lib/server-api";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

type ServerStatusProps = {
  serverId: string;
  connectionAddress: string;
  status?: ServerStatusResponse;
  isLoading: boolean;
  hasError: boolean;
};

export default function ServerStatus({
  serverId,
  connectionAddress,
  status,
  isLoading,
  hasError,
}: ServerStatusProps) {
  if (isLoading) {
    return (
      <div className="flex h-full min-w-0 flex-1 items-center">
        <div className="min-w-0 flex-1 px-4">
          <Skeleton className="h-3 w-2/3" />
        </div>
        <div className="flex h-full shrink-0 items-center border-l px-2">
          <Skeleton className="h-3 w-8" />
        </div>
        <Skeleton className="h-full w-24 shrink-0" />
      </div>
    );
  }

  const isOnline = status?.online === true && !hasError;
  const playerCount = isOnline
    ? `${status.players ?? 0}/${status.maxPlayers ?? 0}`
    : "Offline";
  const serverName = isOnline ? status.name ?? serverId : serverId;

  return (
    <div className="flex h-full min-w-0 flex-1 items-center">
      <div className="min-w-0 flex-1 px-4">
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
        className="flex h-full shrink-0 items-center gap-1 border-l px-2"
        aria-label={isOnline ? `${playerCount} players online` : playerCount}
        aria-live="polite"
      >
        <ChartNoAxesColumnIncreasingIcon
          className={`size-3 ${isOnline ? "text-emerald-500" : "text-muted-foreground"}`}
        />
        <p className="font-mono text-xs">{playerCount}</p>
      </div>
      <Button
        className="h-full"
        disabled={!isOnline}
        onClick={() => window.location.assign(`steam://connect/${connectionAddress}`)}
      >
        Connect <ArrowUpRight />
      </Button>
    </div>
  );
}