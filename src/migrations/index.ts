import * as migration_20260529_101908 from './20260529_101908';
import * as migration_20260601_183438 from './20260601_183438';
import * as migration_20260602_061026 from './20260602_061026';
import * as migration_20260603_141843 from './20260603_141843';
import * as migration_20260610_023419 from './20260610_023419';
import * as migration_20260610_092441 from './20260610_092441';
import * as migration_20260611_073157 from './20260611_073157';

export const migrations = [
  {
    up: migration_20260529_101908.up,
    down: migration_20260529_101908.down,
    name: '20260529_101908',
  },
  {
    up: migration_20260601_183438.up,
    down: migration_20260601_183438.down,
    name: '20260601_183438',
  },
  {
    up: migration_20260602_061026.up,
    down: migration_20260602_061026.down,
    name: '20260602_061026',
  },
  {
    up: migration_20260603_141843.up,
    down: migration_20260603_141843.down,
    name: '20260603_141843',
  },
  {
    up: migration_20260610_023419.up,
    down: migration_20260610_023419.down,
    name: '20260610_023419',
  },
  {
    up: migration_20260610_092441.up,
    down: migration_20260610_092441.down,
    name: '20260610_092441',
  },
  {
    up: migration_20260611_073157.up,
    down: migration_20260611_073157.down,
    name: '20260611_073157'
  },
];
