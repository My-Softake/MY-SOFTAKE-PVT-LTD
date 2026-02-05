import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match only internationalized pathnames
    // locales: ['en-US', 'en-GB', 'ja', 'zh', 'ko']
    matcher: ['/', '/(en-US|en-GB|ja|zh|ko)/:path*']
};
