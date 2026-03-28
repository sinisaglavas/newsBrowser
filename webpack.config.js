
const path = require('path');
const Dotenv = require('dotenv-webpack');
module.exports = {
    mode: 'production', // 4. Režim rada
    entry: './src/script.mjs', // 1. Ulazna tačka
    output: {
        filename: 'script.min.js', // 3. Ime izlaznog fajla
        path: path.resolve(__dirname, 'dist'), // 2. Izlazni folder
    },
    plugins: [
        new Dotenv()
    ]
}