import Head from 'next/head';
import Search from '../components/Search';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Movie Search</title>
                <meta name="description" content="Поиск фильмов с использованием OMDb API" />
            </Head>
            <main>
                <Search />
            </main>
        </div>
    );
}