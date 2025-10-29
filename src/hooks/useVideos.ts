import { useQuery } from '@tanstack/react-query';
import {VideosResponse} from "@/src/lib/types/video";

const fetchVideos = async (): Promise<VideosResponse> => {
    const response = await fetch('/api/videos');

    if (!response.ok) {
        throw new Error('Не удалось загрузить видео');
    }

    return response.json();
};

// Хук для клиента
export const useVideos = () => {
    return useQuery({
        queryKey: ['videos'],
        queryFn: fetchVideos,
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
    });
};