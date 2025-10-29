import type { Metadata } from 'next';
import './globals.css';
import { Providers } from "@/src/components/Providers";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: 'Каталог видео',
    description: 'Каталог обучающих видео',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode;
}) {
    return (
        <html lang="ru">
        <body>
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}