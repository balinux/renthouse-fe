/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: `${process.env.NEXT_PUBLIC_STORAGE_IMAGE_URL}/*`,
      },
    ],
  },
};

export default nextConfig;
