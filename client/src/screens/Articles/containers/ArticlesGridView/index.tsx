import React from 'react';
import { connect } from 'react-redux';

import { fetchArticles } from '../../routines';

export interface IArticlesGridProps {
  fetchArticles: any
}
interface IArticlesGridState {}

class ArticlesGridView extends React.Component<
  IArticlesGridProps,
  IArticlesGridState
> {
  componentDidMount() {
    const { fetchArticles } = this.props;

    fetchArticles();
  }

  render() {
    return <div></div>;
  }
}

const mapDispatchToProps = {
  fetchArticles
};

export default connect(null, mapDispatchToProps)(ArticlesGridView);
