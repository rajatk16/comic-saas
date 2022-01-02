import Head from 'next/head';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {config} from '@fortawesome/fontawesome-svg-core';;
import { Card } from '../components/Card';
import { supabase } from '../utils/supabase';

config.autoAddCss = false;

export default function Home({comics}) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      <Head>
        <title>Comic SaaS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {comics.map(comic => (
          <Card
            key={comic.id} 
            item={comic}
          />
        ))}
    </div>
  )
}

export const getStaticProps = async () => {
  const {data: comics} = await supabase.from('comics').select("*");

  return {
    props: {
      comics
    }
  }
}