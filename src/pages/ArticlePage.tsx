import React from 'react';
import { Article } from '../components/articles/Article';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useArticles } from '../hooks/useArticles';
import { Loading } from '../components/Loading';

const ArticlePage = () => {
    const { articles, isLoadingInitialData, isLoadingMore, hasReachedEnd, size, setSize } = useArticles();

    return (
        <main className='container max-h-screen mx-auto px-4 px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8'>
            <h2 className='text-3xl font-bold sm:text-4xl'>Articles</h2>

            <InfiniteScroll
                dataLength={articles.length}
                next={() => {
                    console.log('call');
                    return setSize(size + 1);
                }}
                hasMore={!hasReachedEnd}
                loader={<Loading isLoading={!!isLoadingMore} />}
                endMessage={<h4 className='tracking-widest text-gray-500 uppercase'>Yay! You have seen it all</h4>}
            >
                <div className='lg:grid gap-2 mt-2 lg:grid-cols-12'>
                    {articles.map((article, index) => (
                        <Article key={index} article={article} />
                    ))}
                </div>
            </InfiniteScroll>
        </main>
    );
};

export default ArticlePage;
