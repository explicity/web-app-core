import React from 'react';
import { connect } from 'react-redux';
import { boundMethod } from 'autobind-decorator';
import { Box, Grid } from 'grommet';
import map from 'lodash/map';

import LoaderWrapper from 'components/LoaderWrapper';
import ArticleGridItem from '../../components/ArticleGridItem';
import { IGlobalState } from 'models/global-state';
import { IBindingCallback1 } from 'models/callback';

import { getArticlesState } from '../../selectors';
import { fetchNewspaperArticles } from '../../routines';

import styles from './styles.module.scss';

// TODO fix ts types
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
    this.bindData();
  }

  @boundMethod
  bindData() {
    const { fetchNewspaperArticles, user } = this.props;
    fetchNewspaperArticles({ newspaperId: user.newspapers[0].id });
  }

  render() {
    const { loading, articles } = this.props;

    return (
      <LoaderWrapper loading={loading}>
        <Box
          pad='medium'
          background={{ color: '#fff' }}
          className={styles.wrapper}
        >
          <Box flex direction='row-responsive' wrap>
            {map(articles, item => (
              <ArticleGridItem item={item} key={item.id} />
            ))}
          </Box>
        </Box>
      </LoaderWrapper>
    );
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
