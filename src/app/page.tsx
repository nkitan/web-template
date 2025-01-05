import AppLogo from '@/components/ui/app-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex shrink-0 rounded-lg bg-transparent p-4 md:h-40 h-30">
        <AppLogo />
      </div>
      <div className="flex gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-3/5 md:px-20 mx-auto">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to {process.env.APP_NAME}.</strong>
            <br/> <br/>
            This is the Home Page for the{' '}
            <a href={process.env.APP_REPO} className="text-blue-500">
              {process.env.APP_NAME} v{process.env.APP_VERSION}
            </a>
            , brought to you by github.com/nkitan.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Sign Up</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      </div>
    </main>
  );
}