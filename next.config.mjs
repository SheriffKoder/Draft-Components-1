/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      ignoreBuildErrors: true,  // Ignores all TypeScript errors during build
    },
    eslint: {
      ignoreDuringBuilds: true,  // Ignores ESLint errors during build
    },
    // Optionally, ignore specific paths
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'].filter(ext => !ext.includes('page')),
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'picsum.photos',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'wallpapers.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'media.istockphoto.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'cdn.pixabay.com',
            port: '',
            pathname: '/**',
          },
        ],
       
      },
};

export default nextConfig;
