import React from 'react';
import { connect } from 'react-redux';
import { boundMethod } from 'autobind-decorator';
import { RouteComponentProps } from 'react-router';

import LoaderWrapper from 'components/LoaderWrapper';
import { IGlobalState } from 'models/global-state';
import { IBindingCallback1 } from 'models/callback';

import { fetchExtendedNewspaperArticle } from '../../routines';

interface MatchParams {
  id: string;
}

export interface IArticleViewProps extends RouteComponentProps<MatchParams> {
  fetchExtendedNewspaperArticle: IBindingCallback1<{
    newspaperId: string;
    articleId: string;
  }>;
  user: any;
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
      user,
      match: { params },
      fetchExtendedNewspaperArticle
    } = this.props;

    fetchExtendedNewspaperArticle({
      newspaperId: user.newspapers[0].id,
      articleId: params.id
    });
  }

  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  const {
    user: {
      profile: { user }
    }
  } = state;

  return {
    user
  };
};

const mapDispatchToProps = {
  fetchExtendedNewspaperArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleView);
