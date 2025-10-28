import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import {Providers} from "@/src/components/Providers";
import {ReactNode} from "react";

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

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
        <body className={inter.className}>
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}