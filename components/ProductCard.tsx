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

export default function ProductCard({ articleId, product }: Props) {
    const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5165";

    return (
        <article className="rounded-xl border border-gray-700 p-4 shadow-sm bg-[#0f0f0f]">
            <div className="flex flex-col gap-4 md:flex-row">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-40 w-40 rounded-lg object-cover"
                />

                <div className="flex-1 space-y-2">
                    <h2 className="text-xl font-semibold text-white">
                        {product.title}
                    </h2>

                    {product.customSummary ? (
                        <p className="text-gray-400">{product.customSummary}</p>
                    ) : null}

                    <div className="flex gap-4 text-sm text-gray-500">
                        {product.price != null ? <span>${product.price}</span> : null}
                        {product.rating != null ? <span>⭐ {product.rating}</span> : null}
                    </div>

                    <a
                        href={`${apiBaseUrl}/r/${articleId}/${product.id}`}
                        target="_blank"
                        rel="noreferrer sponsored"
                        className="inline-block rounded-lg bg-white px-4 py-2 text-black font-medium hover:bg-gray-200"
                    >
                        View on Amazon
                    </a>
                </div>
            </div>
        </article>
    );
}