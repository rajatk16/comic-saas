import Link from 'next/link'
import Image from 'next/image';

export const Card = ({item}) => {
  return (
    <div 
      className="flex flex-col border-gray-400 border-2 rounded pb-5 hover:transition-opacity duration-500 hover:shadow-2xl"
    >
      <div>
        <Image
          className="rounded" 
          src={item.imageUrl}
          alt={item.title}
          width={500}
          height={500}
          layout="responsive"
          loading='eager'
          priority
        />
      </div>
      <h1 className="text-center my-3 text-xl">{item.title}</h1>
      <div className="m-2">
        <div className="flex justify-between">
          <p className="text-sm">
            {new Date(item.created_at).toLocaleDateString()}
          </p>
          <p className="text-sm">
            ${item.price}
          </p>
        </div>
      </div>
      <div className="m-2">
        <div className="flex justify-center">
          <Link 
            href={`/${item.slug}`}
          >
            <button className="bg-blue-500 w-full px-2 py-2 rounded-lg transition duration-500 ease-in-out hover:ring-2 ring-offset-2 ring-blue-300 text-white text-sm">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}