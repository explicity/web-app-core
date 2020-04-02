import React, { FunctionComponent } from 'react';

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
