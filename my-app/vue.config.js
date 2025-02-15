const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    configureWebpack: {
        resolve: {
            alias: {
                '@': require('path').resolve(__dirname, 'src') // Настройка алиаса для src/
            }
        }
    },
    devServer: {
        proxy: {
            '/api-shop': {
                target: 'http://lifestealer86.ru',
                changeOrigin: true,
                logLevel: 'debug'
            }
        }
    }
});