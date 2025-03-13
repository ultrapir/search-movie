import Head from 'next/head';
import Search from '../components/Search';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Movie Search</title>
                <meta charset="UTF-8" />
                <meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate" />
                <meta http-equiv="Pragma" content="no-cache" />
                <meta http-equiv="Expires" content="0" />
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
                <meta name="description" content="Поиск фильмов с использованием OMDb API" />
            </Head>
            <main>
                <Search />
            </main>
        </div>
    );
}