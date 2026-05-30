import * as migration_20260529_101908 from './20260529_101908';

export const migrations = [
  {
    up: migration_20260529_101908.up,
    down: migration_20260529_101908.down,
    name: '20260529_101908'
  },
];
