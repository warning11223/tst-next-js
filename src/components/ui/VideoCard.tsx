import Image from 'next/image';
import Link from 'next/link';
import {Video} from "@/src/lib/types/video";
import {formatDate, formatDuration} from "@/src/lib/utils/video";

interface VideoCardProps {
    video: Video;
}

export const VideoCard = ({ video }: VideoCardProps) => {
    return (
        <Link
            href={`/video/${video.id}`}
            className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            <div className="relative aspect-video bg-gray-200">
                <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1199px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.durationSec)}
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {video.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{video.author}</p>
                <p className="text-xs text-gray-500">{formatDate(video.publishedAt)}</p>
            </div>
        </Link>
    );
};