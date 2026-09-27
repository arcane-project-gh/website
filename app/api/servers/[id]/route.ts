import { createValveProtocol } from "@srvquery/protocol-valve";
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
      timeout: 1500,
      retry: { retries: 1 },
    });
    const info = await protocol.query({ opcode: "INFO" });

    return Response.json(
      {
        online: true,
        name: info.name,
        players: info.players,
        maxPlayers: info.maxPlayers,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { online: false },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}