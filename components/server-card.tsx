import { Server } from "@/lib/servers";
import { cn } from "@/lib/utils";
import { Popover } from "@base-ui/react/popover";
import { ArrowUpRight } from "lucide-react";
import ServerMods from "./server-mods";
import ServerStatus from "./server-status";
import { Button } from "./ui/button";

type ServerCardProps = Pick<Server, "id" | "description" | "tags"> & {
    className?: string;
};

export default function ServerCard({ id, description, tags, className }: ServerCardProps) {
  return (
    <div className={cn("flex w-full flex-col", className)}>
      <div className="h-14 w-full border-b">
        <div className="h-full w-full flex items-center">
          <ServerStatus serverId={id} />
          <Button className="h-full">
            Connect <ArrowUpRight />
          </Button>
        </div>
      </div>
      <div className="min-h-30 flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          {description.map((paragraph) => (
            <p key={paragraph} className="text-muted-foreground text-xs leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <ServerMods serverId={id} />
          {tags?.map((tag) => (
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
                      <Popover.Description>{tag.description}</Popover.Description>
                    </Popover.Popup>
                  </Popover.Positioner>
                </Popover.Portal>
              </Popover.Root>
          ))}
        </div>
      </div>
    </div>
  );
}
