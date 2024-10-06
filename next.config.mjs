/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'dev-joar.oss-ap-southeast-1.aliyuncs.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'via.placeholder.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'placehold.co',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'mahir-digital-id.oss-ap-southeast-5.aliyuncs.com',
            pathname: '**',
          },
        ],
      },
};

export default nextConfig;