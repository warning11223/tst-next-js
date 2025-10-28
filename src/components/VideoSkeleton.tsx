export const VideoSkeleton = () => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
            <div className="aspect-video bg-gray-300" />
            <div className="p-4">
                <div className="h-5 bg-gray-300 rounded mb-2 w-3/4" />
                <div className="h-4 bg-gray-200 rounded mb-1 w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
            </div>
        </div>
    );
};