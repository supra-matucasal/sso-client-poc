import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1> HOME PAGE</h1>
        
        <Link href="/api/auth/login">
          Login
        </Link>

      </div>
    </main>
  );
}