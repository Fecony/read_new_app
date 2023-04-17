import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import axios from '../lib/axios';

export const useArticles = () => {
    let hasReachedEnd = false;

    const { data, error, size, setSize } = useSWRInfinite(
        (index) => `/api/articles?page=${index + 1}`,
        (url) =>
            axios
                .get(url)
                .then((res) => {
                    hasReachedEnd = res.data.current_page === res.data.last_page;

                    return res.data.data;
                })
                .catch((error) => {
                    if (error.response.status !== 409) throw error;
                }),
        {
            initialSize: 1,
            revalidateFirstPage: false,
            revalidateIfStale: false,
            revalidateOnFocus: false,
        },
    );

    const isLoadingInitialData = !data && !error;
    const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === `undefined`);

    return {
        articles: data?.flat() || [],
        isLoadingInitialData,
        isLoadingMore,
        hasReachedEnd,
        size,
        setSize,
    };
};
