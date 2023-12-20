/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
      {
        source: '/tft/summoner/:path*',
        destination: 'https://kr.api.riotgames.com/tft/summoner/:path*',
      },
      {
        source: '/tft/league/:path*',
        destination: 'https://kr.api.riotgames.com/tft/league/:path*',
      },
      {
        source: '/tft/match/:path*',
        destination: 'https://asia.api.riotgames.com/tft/match/:path*',
      },
    ]
  },
}

module.exports = nextConfig;
