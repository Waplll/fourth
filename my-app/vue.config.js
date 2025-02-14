const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    devServer: {
        proxy: {
            '/api-shop': {
                target: 'http://lifestealer86.ru', // Адрес удалённого API
                changeOrigin: true, // Разрешить изменение заголовков для поддержки CORS
                secure: false, // Отключить проверку SSL (если сертификат некорректный)
                logLevel: 'debug' // Включить логирование для отладки
            }
        }
    },
    configureWebpack: {
        resolve: {
            fallback: {
                https: false // Отключаем модуль https, так как он не нужен в браузере
            }
        }
    }
});