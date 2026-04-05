import { getStats } from "@/lib/api";

export async function GET() {
    const stats = await getStats();

    return Response.json(stats);
}
