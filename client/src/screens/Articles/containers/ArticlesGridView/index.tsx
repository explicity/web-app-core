import React from 'react';
import { connect } from 'react-redux';

import { fetchArticles } from '../../routines';
import { getAllArticles } from './reducer';
import { IGlobalState } from 'models/global-state';
import { IBindingAction } from 'models/callback';
import { IArticle } from '../../models/article';

export interface IArticlesGridProps {
  fetchArticles: IBindingAction,
  loading: boolean,
  error: object | string | null,
  articles: IArticle[]
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

const mapStateToProps = (state: IGlobalState) =>{
  const { loading, error } = state.articles.requests.articles;

  return {
    loading,
    error,
    articles: getAllArticles(state.articles.articles)
  }
}

const mapDispatchToProps = {
  fetchArticles
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesGridView);
