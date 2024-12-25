/** @type {import('next').NextConfig} */
const nextConfig = {
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
