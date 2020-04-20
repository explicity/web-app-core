import React, { FunctionComponent } from 'react';
import { Text, Box } from 'grommet';
import { MdError } from 'react-icons/md';

import styles from './styles.module.scss';

interface IErrorMessageProps {
  error: string;
}

const ErrorMessage: FunctionComponent<IErrorMessageProps> = ({ error }) => (
  <Box
    background='status-error'
    round='xxsmall'
    pad={{ vertical: 'xsmall', horizontal: 'medium' }}
    margin={{ bottom: '15px' }}
    className={styles.container}
  >
    <Text size='small' weight='bold'>
      <MdError className={styles.icon} />
      {error}
    </Text>
  </Box>
);

export default ErrorMessage;
