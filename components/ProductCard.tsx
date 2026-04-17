type Props = {
    articleId: string;
    product: {
        id: string;
        title: string;
        imageUrl: string;
        price?: number | null;
        rating?: number | null;
        position: number;
        customSummary?: string | null;
    };
};

export function getProductBadge(position: number) {
    const badges: Record<number, string> = {
        1: "Best Budget Pick",
        2: "Most Versatile",
        3: "Best for Floor Workouts",
        4: "Strength Builder",
        5: "Easy Cardio Option",
    };

    return badges[position] ?? null;
}

function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
}

export default function ProductCard({ articleId, product }: Props) {
    const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5165";
    const badge = getProductBadge(product.position);
    const hasMetadata = product.price != null || product.rating != null;

    return (
        <article className="rounded-xl border border-gray-700 bg-[#0f0f0f] p-5 shadow-sm transition-colors hover:border-gray-500 sm:p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-start">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-52 w-full flex-shrink-0 rounded-lg object-cover md:h-44 md:w-44"
                />

                <div className="flex flex-1 flex-col gap-4">
                    <div className="space-y-3">
                        {badge ? (
                            <span className="inline-flex rounded-md border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-xs font-medium text-amber-200">
                                {badge}
                            </span>
                        ) : null}

                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold leading-snug text-white">
                                {product.title}
                            </h2>

                            {hasMetadata ? (
                                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-300">
                                    {product.rating != null ? (
                                        <span
                                            className="rounded-md bg-white/5 px-2.5 py-1"
                                            aria-label={`Rated ${product.rating} out of 5`}
                                        >
                                            <span aria-hidden="true">⭐</span> {product.rating}
                                        </span>
                                    ) : null}
                                    {product.price != null ? (
                                        <span className="rounded-md bg-white/5 px-2.5 py-1 font-medium text-white">
                                            {formatPrice(product.price)}
                                        </span>
                                    ) : null}
                                </div>
                            ) : null}
                        </div>

                        {product.customSummary ? (
                            <p className="leading-7 text-gray-400">{product.customSummary}</p>
                        ) : null}
                    </div>

                    <a
                        href={`${apiBaseUrl}/r/${articleId}/${product.id}`}
                        target="_blank"
                        rel="noreferrer sponsored"
                        aria-label={`Check price on Amazon for ${product.title}`}
                        className="inline-flex w-full items-center justify-center rounded-lg bg-amber-400 px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-[#0f0f0f] sm:w-auto"
                    >
                        Check Price on Amazon
                    </a>
                </div>
            </div>
        </article>
    );
}
