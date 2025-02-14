const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    devServer: {
        proxy: {
            '/api-shop': {
                target: 'http://lifestealer86.ru', // Используем HTTP вместо HTTPS
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/img': { // Прокси для изображений
                target: 'http://lifestealer86.ru',
                changeOrigin: true,
                logLevel: 'debug'
            }
        }
    },
    configureWebpack: {
        resolve: {
            fallback: {
                https: false // Отключаем модуль https
            }
        }
    }
});