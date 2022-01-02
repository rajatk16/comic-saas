import Image from 'next/image';

import { supabase } from "../utils/supabase";
import { useUserState } from '../context/user';
import { useCartState } from '../context/cart';

const ComicDetails = ({comic}) => {
  const {user} = useUserState();
  const {addComic} = useCartState();
  
  return (
    <div className="flex justify-evenly mt-20">
      <div className="w-6/12">
        <Image 
          src={comic.imageUrl}
          alt={comic.title}
          width={500}
          height={600}
          loading='eager'
          priority
        />
      </div>
      <div className="w-4/12">
        <h1 className="text-4xl">{comic.title}</h1>
        <div className="text-center mt-5">
            <h3 className="text-base">Price: ${comic.price}</h3>
        </div>
        <div className="flex flex-row justify-between my-5">
          <div>
            <h3 className="text-xl">Publised:</h3>
            <h3 className="text-base">{comic.created_at}</h3>
          </div>
        </div>
        <div className="flex flex-row justify-between my-5">
          <div>
            <h3 className="text-xl">Writer:</h3>
            <h3 className="text-base">{comic.writer}</h3>
          </div>
          <div>
            <h3 className="text-xl">Penciler:</h3>
            <h3 className="text-base">{comic.penciler}</h3>
          </div>
        </div>
        {comic.illustrator && (
          <div>
            <h3 className="text-xl">Illustrator:</h3>
            <h3 className="text-base">{comic.illustrator}</h3>
          </div>
        )}
        <div className="my-5">
          {comic.description}
        </div>
        <div className="flex justify-center w-full flex-col">
          {user ? (
            <button 
              className={`bg-green-500 w-full px-2 py-2 rounded-lg transition duration-500 ease-in-out hover:ring-2 ring-offset-2 ring-green-300 text-white text-sm`}
              disabled={!user}
              onClick={() => addComic(comic)}
            >
              Add To Cart
            </button>
          ) : (
            <p className="text-sm text-center text-red-500">
              Please Sign In to buy this comic
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const {data: comicSlugs} = await supabase.from('comics').select('slug');

  const paths = comicSlugs.map(({slug}) => ({
    params: {
      slug 
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({params: {slug}}) => {
  const {data: comic} = await supabase.from("comics").select("*").eq("slug", slug).single()
  return {
    props: {
      comic
    }
  }
}

export default ComicDetails;