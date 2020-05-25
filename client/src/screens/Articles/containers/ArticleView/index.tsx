import React from 'react';
import { connect } from 'react-redux';
import { boundMethod } from 'autobind-decorator';
import { RouteComponentProps } from 'react-router';

import LoaderWrapper from 'components/LoaderWrapper';
import { IBindingCallback1 } from 'models/callback';

import { getExtendedArticle } from '../../selectors';
import { fetchExtendedNewspaperArticle } from '../../routines';

interface MatchParams {
  newspaperId: string;
  articleId: string;
}

export interface IArticleViewProps extends RouteComponentProps<MatchParams> {
  fetchExtendedNewspaperArticle: IBindingCallback1<{
    newspaperId: string;
    articleId: string;
  }>;
  loading: boolean;
  error: object | string | null;
  article: any
}
interface IArticleViewState {}

class ArticleView extends React.Component<
  IArticleViewProps,
  IArticleViewState
> {
  componentDidMount() {
    this.bindData();
  }

  @boundMethod
  bindData() {
    const {
      match: { params },
      fetchExtendedNewspaperArticle
    } = this.props;

    fetchExtendedNewspaperArticle({
      newspaperId: params.newspaperId,
      articleId: params.articleId
    });
  }

  render() {
    console.log(this.props.article);
    return <div></div>;
  }
}

const mapStateToProps = (state, props) => {
  const { articleId } = props.match.params;

  const { loading, error } = state.article.requests.extendedArticle;
  const {
    user: {
      profile: { user }
    }
  } = state;

  return {
    loading,
    error,
    article: getExtendedArticle(state, articleId)
  };
};

const mapDispatchToProps = {
  fetchExtendedNewspaperArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleView);
