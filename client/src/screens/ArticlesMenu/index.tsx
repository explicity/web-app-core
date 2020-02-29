import React from 'react';

import ArticlesGridView from 'screens/Articles/containers/ArticlesGridView';

export interface IArticlesMenuProps {}
interface IArticlesMenuState {}

class ArticlesMenu extends React.Component<
  IArticlesMenuProps,
  IArticlesMenuState
> {
  render() {
    return <ArticlesGridView />;
  }
}

export default ArticlesMenu;
