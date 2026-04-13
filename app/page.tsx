import Link from "next/link";
import { getPublishedArticles } from "@/lib/api";

export default async function HomePage() {
    const articles = await getPublishedArticles();

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="mx-auto max-w-4xl px-4 py-16 space-y-6">
                <h1 className="text-4xl font-bold">Home Gym Picks</h1>
                <p className="text-gray-400">
                    Simple fitness gear and small-space home gym ideas.
                </p>

                {articles.length === 0 ? (
                    <p className="text-gray-400">No published articles yet.</p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {articles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/${article.language}/${article.slug}`}
                                className="rounded-lg border border-gray-700 p-4 hover:border-gray-400"
                            >
                                <h2 className="text-xl font-semibold">{article.title}</h2>
                                <p className="mt-2 text-sm uppercase tracking-wide text-gray-500">
                                    {article.language}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
