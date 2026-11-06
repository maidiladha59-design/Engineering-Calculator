/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    // Google ad scripts are loaded from these hosts. They are only requested
    // after the visitor accepts the cookie banner.
    const adsScripts = [
      "https://*.googlesyndication.com",
      "https://*.googleadservices.com",
      "https://*.doubleclick.net",
      "https://*.google.com",
      "https://*.gstatic.com",
    ].join(" ");

    const contentSecurityPolicy = [
      "default-src 'self'",
      // Next.js ships inline bootstrap scripts; KaTeX HTML and ad scripts also
      // rely on inline execution. Ad code is sandboxed in its own iframes.
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${adsScripts}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      `connect-src 'self' ${adsScripts}`,
      `frame-src 'self' https://*.googlesyndication.com https://*.doubleclick.net https://www.google.com https://*.google.com`,
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
