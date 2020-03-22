import React, { FunctionComponent } from 'react';

import './styles.module.scss';

interface ILoaderWrapperProps {
  loading: boolean;
}

const LoaderWrapper: FunctionComponent<ILoaderWrapperProps> = ({
  loading,
  children
}) =>
  loading ? (
    <div style={{ position: 'relative' }}>
      <p>Loading...</p>
    </div>
  ) : (
    <>{children}</>
  );

export default LoaderWrapper;
