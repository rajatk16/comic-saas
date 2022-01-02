import Link from 'next/link';

import { useUserState } from '../context/user';

export const Header = () => {
  const { user } = useUserState();
  return (
    <header className="bg-blue-900">
      <nav className="container px-6 py-4 mx-auto flex justify-between items-center">
        <div className="flex items-center justify-between">
          <Link href="/">
            <p className="text-xl text-white cursor-pointer">
              Comics SaaS
            </p>
          </Link>
        </div>
        <div
          className="
            flex flex-col
            mt-2
            space-y-4
            md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0
          "
        >
        {user ? (
          <>
            <Link href="/orders">
              <p className="cursor-pointer text-white">
                {user.user_metadata.full_name}
              </p>
            </Link>
            <Link href="/cart">
              <div className="cursor-pointer text-white">
                Cart
              </div>
            </Link>
            <Link href="/logout">
              <p className="text-white cursor-pointer">
                Signout
              </p>
            </Link>
          </>
        ): (          
          <Link href="/login">
            <p className="text-white cursor-pointer">
              Sign In
            </p>
          </Link>
        )}
        </div>
      </nav>
    </header>
  )
}