// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require('@sentry/nextjs');
const nextTranslate = require('next-translate-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/es/terms-of-service',
        destination: '/es/terminos-servicio',
        permanent: true,
        locale: false,
      },
      {
        source: '/es/privacy-notice',
        destination: '/es/aviso-privacidad',
        permanent: true,
        locale: false,
      },
      {
        source: '/es/faq',
        destination: '/es/preguntas-frecuentes',
        permanent: true,
        locale: false,
      },
      {
        source: '/es/how-it-works',
        destination: '/es/como-funciona',
        permanent: true,
        locale: false,
      },
      {
        source: '/es/contact',
        destination: '/es/contacto',
        permanent: true,
        locale: false,
      },
      {
        source: '/es/pricing',
        destination: '/es/precios',
        permanent: true,
        locale: false,
      },
      {
        source: '/es/dashboard',
        destination: '/es/panel',
        permanent: true,
        locale: false,
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap',
      },
    ]
  },
}

module.exports = nextTranslate(
  withSentryConfig(
    nextConfig,
    {
      silent: true,
      org: "tonymtz",
      project: "tomatoro-com",
    },
    {
      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,

      // Transpiles SDK to be compatible with IE11 (increases bundle size)
      transpileClientSDK: true,

      // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
      tunnelRoute: "/monitoring",

      // Hides source maps from generated client bundles
      hideSourceMaps: true,

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,
    },
  ),
);
