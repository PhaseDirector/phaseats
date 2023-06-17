module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'usernamephase',
    password: 'password',
    database: 'PhaseATS',
    entities: ['src/entities/**/*.js'], // Path to your entity files
    synchronize: true, // Auto-create database tables (for development only)
  };
  