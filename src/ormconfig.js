module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'PhaseATS',
    entities: ['src/entities/*.js'],
    synchronize: true,
  };
  