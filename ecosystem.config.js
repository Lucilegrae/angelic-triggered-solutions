export default {
  apps: [
    {
      name: "ATS-Core",
      script: "src/server/index.js",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      env: {
        NODE_ENV: "development",
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
      },
      env_production: {
        NODE_ENV: "production",
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
      },
      error_file: "logs/ats-error.log",
      out_file: "logs/ats-out.log",
      time: true
    }
  ]
};
