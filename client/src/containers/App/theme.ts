import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const theme = deepMerge(grommet, {
  global: {
    focus: {
      border: {
        color: 'red'
      }
    },
    colors: {
      brand: 'blue'
    }
  }
});

export default theme;
