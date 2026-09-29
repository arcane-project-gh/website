import { serverBrowserProtocol2RulesParser } from "@srvquery/protocol-valve";
import type { ServerModsResponse } from "@/lib/server-api";
import {
  createServerProtocol,
  getServerById,
  SERVER_MODS_QUERY_TIMEOUT_MS,
} from "@/lib/server-query";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const server = getServerById(id);

  if (!server) {
    return Response.json({ error: "Server not found" }, { status: 404 });
  }

  try {
    const protocol = createServerProtocol(server, SERVER_MODS_QUERY_TIMEOUT_MS);
    const rules = await protocol.query({
      opcode: "RULES",
      parser: serverBrowserProtocol2RulesParser,
    });

    const result: ServerModsResponse = {
      mods: rules.mods.map(({ name, id: modId }) => ({
        name,
        id: modId.toString(),
      })),
    };
    return Response.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
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