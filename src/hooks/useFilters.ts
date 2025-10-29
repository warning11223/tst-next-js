import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/src/hooks/useDebounce';
import { filterByDuration, filterBySearch, sortByDate } from '@/src/lib/utils/video';
import { DurationFilterType, Video } from '@/src/lib/types/video';

export const useFilters = (initialData: Video[]) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [duration, setDuration] = useState<DurationFilterType>(
        (searchParams.get('duration') as DurationFilterType) || 'all'
    );

    const debouncedSearch = useDebounce(search, 500);

    // Синхронизация с URL
    useEffect(() => {
        const params = new URLSearchParams();
        if (debouncedSearch) params.set('search', debouncedSearch);
        if (duration !== 'all') params.set('duration', duration);

        const query = params.toString();
        router.replace(query ? `?${query}` : '/', { scroll: false });
    }, [debouncedSearch, duration, router]);

    // Фильтрация видео
    const filteredVideos = useMemo(() => {
        let result = [...initialData];
        result = sortByDate(result);
        result = filterByDuration(result, duration);
        result = filterBySearch(result, debouncedSearch);
        return result;
    }, [initialData, duration, debouncedSearch]);

    // Сброс фильтров
    const resetFilters = () => {
        setSearch('');
        setDuration('all');
    };

    return {
        search,
        setSearch,
        duration,
        setDuration,
        filteredVideos,
        resetFilters,
    };
};