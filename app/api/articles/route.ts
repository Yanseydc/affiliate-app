import { getPublishedArticles } from "@/lib/api";

export async function GET() {
    const articles = await getPublishedArticles();

    return Response.json(articles);
}
