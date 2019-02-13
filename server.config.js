module.exports = {
    apps: [
        {
            name: 'server',
            script: './server/app.js',
            env: {
                'NODE_ENV': 'production'
            }
        }
    ]
}
