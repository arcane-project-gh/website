import {
  createValveProtocol,
  serverBrowserProtocol2RulesParser,
} from "@srvquery/protocol-valve";
import { SERVERS } from "@/lib/servers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const server = SERVERS.find((entry) => entry.id === id);

  if (!server) {
    return Response.json({ error: "Server not found" }, { status: 404 });
  }

  try {
    const protocol = createValveProtocol({
      host: server.ip,
      port: server.queryPort,
      timeout: 5000,
      retry: { retries: 1 },
    });
    const rules = await protocol.query({
      opcode: "RULES",
      parser: serverBrowserProtocol2RulesParser,
    });

    return Response.json(
      {
        mods: rules.mods.map(({ name, id: modId }) => ({
          name,
          id: modId.toString(),
        })),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Unable to query server mods" },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}