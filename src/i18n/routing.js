import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en-US', 'en-GB', 'ja', 'zh', 'ko'],
  defaultLocale: 'en-US',
  localeDetection: false, // Domain hit করলে সবসময় en-US (default), ব্রাউজার/cookie দিয়ে en-GB সিলেক্ট হবে না
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
