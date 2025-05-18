import { Link, Outlet } from 'react-router-dom';
import './Rootlayout.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { ClerkProvider } from '@clerk/clerk-react'
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from '@tanstack/react-query'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

const queryClient = new QueryClient({

});

const Rootlayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" routing="react">
      <QueryClientProvider client={queryClient}>


        <div className='Rootlayout'>
          <header>
            <Link to="/" className="logo">
              <img src="/logo.png" alt="" />
              <span>YOUR AI</span>
            </Link>
            <div className="user">
              <SignedIn>
                <UserButton />
              </SignedIn> </div>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  )
}

export default Rootlayout