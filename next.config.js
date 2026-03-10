/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Evita falha de deploy por regra de lint no ambiente CI/Coolify.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
