module.exports = [
  {
    script: 'dist/app.js',
    name: 'hyodori-server',
    exec_mode: 'cluster',
    instances: 0,
  },
];
