module.exports = {
    apps: [
        {
            name: 'IRIS',
            script: 'bin/run.js',
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ],
    deploy: {
        production: {
            user: 'node',
            host: '172-31-1-42',
            ref: 'origin/master',
            repo: 'https://github.com/nikhilgarg459/iris.git',
            path: '/srv/production',
            'post-deploy': 'cp ../.env ./ && npm install && pm2 startOrRestart ecosystem.config.js --env production'
        }
    }
};