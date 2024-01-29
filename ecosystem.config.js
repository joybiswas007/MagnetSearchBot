module.exports = {
  apps: [
    {
      name: "mfbot",
      script: "server.js",
      instances: "1",
      exec_mode: "cluster",
      watch: true,
      ignore_watch: ["node_modules", "\\.git", "*.log", "README.md"],
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
