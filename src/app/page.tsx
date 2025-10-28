import {VideoGrid} from "@/src/components/VideoGrid";

export const metadata = {
    title: 'Каталог видео',
    description: 'Каталог обучающих видео по веб-разработке',
};

export default function Home() {
    return (
        <VideoGrid />
    );
}