import { FireIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AppLogo() {
  return (
    <div
      className={`${lusitana.className} flex mx-auto text-slate-800`}
    >
      {/* Icon goes here */}
      <FireIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">{process.env.APP_NAME}</p>
    </div>
  );
}