/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        unoptimized: true,
    },
    experimental: {
        appDir: true,
    },
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
                    { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
                ],
            },
        ]
    },
    // Configuración del runtime para Node.js
    serverComponents: {
        runtime: 'nodejs'
    },
    // Desactivar el runtime de edge por defecto
    experimental: {
        runtime: 'nodejs',
        serverActions: {
            allowedOrigins: ['localhost:3000']
        }
    },
    
}

export default nextConfig;
