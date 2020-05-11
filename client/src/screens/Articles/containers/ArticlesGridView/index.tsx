import React from 'react';
import { connect } from 'react-redux';

import { IGlobalState } from 'models/global-state';
import { IBindingCallback1 } from 'models/callback';

import { getArticlesState } from '../../selectors';
import { fetchNewspaperArticles } from '../../routines';

export interface IArticlesGridProps {
  fetchNewspaperArticles: IBindingCallback1<{ newspaperId: string }>;
  loading: boolean;
  error: object | string | null;
  articles: any;
  user: any;
}
interface IArticlesGridState {}

class ArticlesGridView extends React.Component<
  IArticlesGridProps,
  IArticlesGridState
> {
  componentDidMount() {
    const { fetchNewspaperArticles, user } = this.props;
    fetchNewspaperArticles({ newspaperId: user.newspapers[0].id });
  }

  render() {
    const { articles } = this.props;
    console.log('articles', articles);

    return <div></div>;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  const { loading, error } = state.article.requests.articles;
  const {
    user: {
      profile: { user }
    }
  } = state;

  return {
    loading,
    error,
    user,
    articles: getArticlesState(state)
  };
};

const mapDispatchToProps = {
  fetchNewspaperArticles
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesGridView);
