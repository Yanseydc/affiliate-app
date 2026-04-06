import Link from "next/link";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <div className="mx-auto max-w-4xl px-4 py-16 space-y-6">
                <h1 className="text-4xl font-bold">Home Gym Picks</h1>
                <p className="text-gray-400">
                    Simple fitness gear and small-space home gym ideas.
                </p>

                <div className="flex gap-4">
                    <Link
                        href="/en/5-home-gym-essentials-small-space"
                        className="rounded-lg border px-4 py-2"
                    >
                        English Article
                    </Link>

                    <Link
                        href="/es/5-accesorios-gym-casa"
                        className="rounded-lg border px-4 py-2"
                    >
                        Spanish Article
                    </Link>
                </div>
            </div>
        </main>
    );
}