import Link from "next/link";
import { ArticleTranslation } from "@/lib/types";

type Props = {
    currentLanguage: string;
    translations: ArticleTranslation[];
};

export default function TranslationSwitcher({ currentLanguage, translations }: Props) {
    if (!translations.length) return null;

    return (
        <div className="flex gap-3 text-sm">
            <span className="font-medium">Language:</span>
            <span className="rounded border px-2 py-1">{currentLanguage.toUpperCase()}</span>

            {translations.map((translation) => (
                <Link
                    key={`${translation.language}-${translation.slug}`}
                    href={`/${translation.language}/${translation.slug}`}
                    className="rounded border px-2 py-1 hover:bg-gray-100"
                >
                    {translation.language.toUpperCase()}
                </Link>
            ))}
        </div>
    );
}