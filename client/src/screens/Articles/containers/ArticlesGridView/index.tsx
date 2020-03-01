import React from 'react';
import { connect } from 'react-redux';

import { fetchArticles } from '../../routines';

export interface IArticlesGridProps {}
interface IArticlesGridState {}

class ArticlesGridView extends React.Component<
  IArticlesGridProps,
  IArticlesGridState
> {
  render() {
    return <div></div>;
  }
}

const mapDispatchToProps = {
  fetchArticles
};

export default connect(null, mapDispatchToProps)(ArticlesGridView);
