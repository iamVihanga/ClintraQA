import * as migration_20260529_101908 from './20260529_101908';
import * as migration_20260601_183438 from './20260601_183438';

export const migrations = [
  {
    up: migration_20260529_101908.up,
    down: migration_20260529_101908.down,
    name: '20260529_101908',
  },
  {
    up: migration_20260601_183438.up,
    down: migration_20260601_183438.down,
    name: '20260601_183438'
  },
];
