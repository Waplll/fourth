module.exports = {
    devServer: {
        proxy: {
            '/api-shop': { // Префикс для всех запросов к API
                target: 'https://lifestealer86.ru', // Адрес удалённого API
                changeOrigin: true, // Разрешить изменение заголовков для поддержки CORS
                secure: false, // Отключить проверку SSL (важно для небезопасных сертификатов)
                logLevel: 'debug' // Включить логирование для отладки
            }
        }
    }
};