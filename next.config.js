module.exports = {
  reactStrictMode: true,
  // Thêm target để build cho edge
  target: 'serverless',
  experimental: {
    runtime: 'edge'
  }
}
