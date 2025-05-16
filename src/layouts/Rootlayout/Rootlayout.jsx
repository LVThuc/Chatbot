import { Link, Outlet } from 'react-router-dom';
import './Rootlayout.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import {ClerkProvider} from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

const Rootlayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" routing="react">

    <div className='Rootlayout'>
      <header>
        <Link to="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>MATH AI</span>
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
    </ClerkProvider>
  )
}

export default Rootlayout