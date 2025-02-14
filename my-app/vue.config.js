const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    devServer: {
        proxy: {
            '/api-shop': {
                target: 'http://lifestealer86.ru',
                changeOrigin: true,
                secure: false, // Отключаем проверку SSL
                logLevel: 'debug'
            },
            '/img': { // Прокси для изображений
                target: 'https://lifestealer86.ru',
                changeOrigin: true,
                secure: false, // Отключаем проверку SSL
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