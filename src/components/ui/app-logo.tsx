import { FireIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AppLogo({className, iconsize = 50, textsize = 30}: {className: string, iconsize: number, textsize: number}) {
  return (
    <div
      className={`${lusitana.className} flex mx-auto text-slate-800 ${className}`}
    >
      {/* Icon goes here */}
      <FireIcon className={`h-${iconsize} w-${iconsize} rotate-[15deg]`} />
      <p className={`text-[${textsize}px]`}>{process.env.APP_NAME}</p>
    </div>
  );
}