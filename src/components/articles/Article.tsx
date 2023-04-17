import { IconBrandGuardian, IconBrandNytimes, IconNews } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { clsx } from 'clsx';

type ArticleProps = {
    article: {
        title: string;
        content: string;
        date: string;
        category: string;
        source: string;
        author: string;
    };
};

const ARTICLE_SOURCE_MAP: Record<string, ReactNode> = {
    'news-api': <IconNews className='h-8 sm:h-10 text-gray-600' />,
    'the-guardian': <IconBrandGuardian className='h-8 sm:h-10 text-gray-600' />,
    'the-new-york-times': <IconBrandNytimes className='h-8 sm:h-10 text-gray-600' />,
};

export const Article = ({ article }: ArticleProps) => {
    return (
        <article className='col-span-6 h-min max-h-64 overflow-hidden relative flex items-start justify-between rounded-xl border border-gray-100 p-4 sm:p-6 lg:p-8'>
            <div className='pt-4 text-gray-500'>
                {ARTICLE_SOURCE_MAP[article.source]}

                <h3 className='mt-4 text-lg font-bold text-gray-900 sm:text-xl'>{article.title}</h3>

                <p className='mt-2 hidden text-sm sm:block' dangerouslySetInnerHTML={{ __html: article.content }}></p>
            </div>

            <span
                className={clsx([
                    'rounded-full px-3 py-1.5 text-xs font-medium',
                    !!article.category ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100',
                ])}
            >
                {article.category ? article.category : 'NA'}
            </span>
        </article>
    );
};
