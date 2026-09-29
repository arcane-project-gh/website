import type { ServerStatusResponse } from "@/lib/server-api";
import {
  createServerProtocol,
  getServerById,
  SERVER_INFO_QUERY_TIMEOUT_MS,
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
    const protocol = createServerProtocol(server, SERVER_INFO_QUERY_TIMEOUT_MS);
    const info = await protocol.query({ opcode: "INFO" });

    const result: ServerStatusResponse = {
      online: true,
      name: info.name,
      players: info.players,
      maxPlayers: info.maxPlayers,
    };
    return Response.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    const result: ServerStatusResponse = { online: false };
    return Response.json(result, {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}