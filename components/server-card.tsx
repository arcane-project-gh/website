"use client";

import type { Server } from "@/lib/servers";
import { cn } from "@/lib/utils";
import { Popover } from "@base-ui/react/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import ServerMods from "./server-mods";
import ServerStatus from "./server-status";
import { Skeleton } from "./ui/skeleton";
import { useServerStatus } from "@/lib/use-server-status";

type ServerCardProps = Pick<
  Server,
  "id" | "address" | "description" | "tags"
> & {
  className?: string;
};

export default function ServerCard({
  id,
  address,
  description,
  tags,
  className,
}: ServerCardProps) {
  const { data: status, error, isLoading } = useServerStatus(id);
  const isOnline = status?.online === true && !error;

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <Accordion defaultValue={[]} className="w-full">
        <AccordionItem value="server-details" className="border-0">
          <div className="flex h-14 w-full items-stretch border-b">
            <ServerStatus
              serverId={id}
              connectionAddress={`${address.ip}:${address.ports.game}`}
              status={status}
              isLoading={isLoading}
              hasError={Boolean(error)}
            />
            {isLoading ? (
              <div className="flex h-full w-10 shrink-0 items-center justify-center border-l">
                <Skeleton className="size-3" />
              </div>
            ) : isOnline ? (
              <AccordionTrigger
                aria-label="Toggle server details"
                className="h-full w-10 shrink-0 items-center justify-center border-l px-0 py-0 **:data-[slot=accordion-trigger-icon]:ml-0"
              >
                <span className="sr-only">Toggle server details</span>
              </AccordionTrigger>
            ) : null}
          </div>
          {isLoading ? (
            null
          ) : isOnline ? (
            <AccordionContent className="p-4">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                  {description.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-muted-foreground text-xs leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <ServerMods serverId={id} />
                  {tags.map((tag) => (
                    <Popover.Root key={tag.name}>
                      <Popover.Trigger
                        className="cursor-pointer font-mono text-[10px] text-muted-foreground hover:text-foreground"
                        aria-label={`${tag.name}: show description`}
                      >
                        [{tag.name}]
                      </Popover.Trigger>
                      <Popover.Portal>
                        <Popover.Positioner side="top" sideOffset={8}>
                          <Popover.Popup className="z-50 max-w-64 border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md">
                            <Popover.Description>
                              {tag.description}
                            </Popover.Description>
                          </Popover.Popup>
                        </Popover.Positioner>
                      </Popover.Portal>
                    </Popover.Root>
                  ))}
                </div>
              </div>
            </AccordionContent>
          ) : null}
        </AccordionItem>
      </Accordion>
    </div>
  );
}