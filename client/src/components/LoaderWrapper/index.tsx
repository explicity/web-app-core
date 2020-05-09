import React, { FunctionComponent } from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

interface ILoaderWrapperProps {
  loading: boolean;
}

const LoaderWrapper: FunctionComponent<ILoaderWrapperProps> = ({
  loading,
  children
}) =>
  (loading ? (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <FadeLoader color='#123abc' loading={loading} />
    </div>
  ) : (
    <>{children}</>
  ));

export default LoaderWrapper;
