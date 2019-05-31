module.exports = {
  apps : [{
    name: "myapp",
    script: "./13-01_express.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
    log_type: 'json',
    instances: 3,
    watch: true
  }]
}