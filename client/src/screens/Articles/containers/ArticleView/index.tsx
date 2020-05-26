import React from 'react';
import { connect } from 'react-redux';
import { boundMethod } from 'autobind-decorator';
import { RouteComponentProps } from 'react-router';
import {
  Heading,
  Box,
  Button,
  Text,
  Grid,
  Image,
  Anchor,
  Paragraph
} from 'grommet';
import {
  Favorite,
  Chat,
  Share,
  Clock,
  Twitter,
  FacebookOption,
  Instagram
} from 'grommet-icons';
import moment from 'moment';

import LoaderWrapper from 'components/LoaderWrapper';
import { IBindingCallback1 } from 'models/callback';

import { getExtendedArticle } from '../../selectors';
import { fetchExtendedNewspaperArticle } from '../../routines';

import styles from './styles.module.scss';

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
  article: any;
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
    const { loading, article } = this.props;
    console.log('article', article);

    return (
      <LoaderWrapper loading={loading}>
        {article && (
          <Box background='#2E2D30' className={styles.screen}>
            <Box className={styles.container} margin='large'>
              <Box className={styles.headerOuter}>
                <Box className={styles.headerGenreOuter}>
                  <Text className={styles.headerGenre}>{article.genre}</Text>
                </Box>
                <Box className={styles.headerTitleOuter}>
                  <Heading level='2' className={styles.headerTitle}>
                    {article.title}
                  </Heading>
                  {article.subtitle && (
                    <Heading level='3' className={styles.headerSubtitle}>
                      {article.subtitle}
                    </Heading>
                  )}
                </Box>
                <Grid
                  className={styles.headerInfoOuter}
                  columns={['small', 'xsmall', 'small']}
                  gap='small'
                >
                  <Text className={styles.publicationDate}>
                    <Clock className={styles.publicationDateIcon} />
                    {moment(article.publicationDate).format('ll')}
                  </Text>
                  <Box className={styles.interactionsOuter}>
                    <Text className={styles.interaction}>
                      <Chat className={styles.interactionIcon} />
                      {article.commentCount}
                    </Text>
                    <Text className={styles.interaction}>
                      <Favorite className={styles.interactionIcon} />
                      {article.likeCount}
                    </Text>
                  </Box>
                  <Button
                    plain
                    gap='xsmall'
                    icon={<Share className={styles.shareButtonIcon} />}
                    label='Share'
                    className={`${styles.button} ${styles.shareButton}`}
                  />
                </Grid>
              </Box>

              <Box className={styles.contentOuter}>
                <Grid
                  className={styles.headerInfoOuter}
                  columns={['1/4', '3/4']}
                  gap='xxsmall'
                >
                  <Box className={styles.authorGridOuter}>
                    <Box className={styles.authorOuter}>
                      <Box className={styles.authorWrapper}>
                        <Box className={styles.authorImageOuter}>
                          {article.authors[0].avatarImageLink && (
                            <Image
                              className={styles.avatarImage}
                              src={article.authors[0].avatarImageLink}
                            />
                          )}
                        </Box>
                        <Box className={styles.authorContentOuter}>
                          <Heading level='5' className={styles.authorName}>
                            {`${article.authors[0].firstName} ${article.authors[0].lastName}`}
                          </Heading>
                          <Text className={styles.authorEmail}>
                            {article.authors[0].email}
                          </Text>
                        </Box>
                      </Box>
                      <Box className={styles.authorInteractionsOuter}>
                        <Anchor
                          icon={
                            <FacebookOption
                              className={styles.authorInteractionIcon}
                            />
                          }
                          href='#'
                          className={styles.authorInteraction}
                        />
                        <Anchor
                          icon={
                            <Twitter className={styles.authorInteractionIcon} />
                          }
                          href='#'
                          className={styles.authorInteraction}
                        />
                        <Anchor
                          icon={
                            <Instagram
                              className={styles.authorInteractionIcon}
                            />
                          }
                          href='#'
                          className={styles.authorInteraction}
                        />
                      </Box>
                      <Box className={styles.authorPostsButtonOuter}>
                        <Button
                          plain
                          label='All Posts'
                          className={styles.authorPostsButton}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box className={styles.contentGridOuter}>
                    <Text className={styles.contentText}>
                      {article.content}
                    </Text>
                  </Box>
                </Grid>
              </Box>
            </Box>
          </Box>
        )}
      </LoaderWrapper>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { articleId } = props.match.params;

  const { loading, error } = state.article.requests.extendedArticle;

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
