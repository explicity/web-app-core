import React from 'react';
import { Link } from 'react-router-dom';
import { Heading, Box, Button, Image, Text } from 'grommet';
import { Favorite, Chat } from 'grommet-icons';

import styles from './styles.module.scss';

const ArticleGridItem = ({ item }) => {
  return (
    <Box margin='small' className={styles.cardOuter}>
      <Box className={styles.card}>
        <Link to={`/${item.id}`}>
          <Box className={styles.cardImageOuter}>
            {item.imageLink && (
              <Image className={styles.cardImage} src={item.imageLink} />
            )}
          </Box>
          <Box className={styles.cardGenreOuter}>
            <Text size='xsmall' className={styles.cardGenre}>
              {item.genre}
            </Text>
          </Box>
          <Box className={styles.cardBody}>
            <Heading level='3' className={styles.cardTitle}>
              {item.title}
            </Heading>
            {item.subtitle && (
              <Heading level='4' className={styles.cardTitle}>
                {item.subtitle}
              </Heading>
            )}
          </Box>
          {/* {item.tags && (
          <Box className={styles.cardTagsOuter}>
            {item.tags.slice(0, 2).map(tag => (
              <Text id={tag.id} className={styles.cardTag}>
                {tag.keyword}
              </Text>
            ))}
          </Box>
        )} */}
        </Link>
        <Box
          className={styles.cardFooter}
          direction='row'
          wrap
          border={{ side: 'top', color: 'dark-4', size: 'xsmall' }}
        >
          <Button
            plain
            gap='xsmall'
            icon={
              <Chat
                className={styles.cardFooterButtonIcon}
              />
            }
            label={`${item.commentCount}`}
            margin={{ right: '15px' }}
            className={`${styles.cardFooterButton} ${styles.commentButton}`}
          />
          <Button
            plain
            gap='xsmall'
            icon={<Favorite className={styles.cardFooterButtonIcon} />}
            label={`${item.likeCount}`}
            className={`${styles.cardFooterButton} ${styles.likeButton}`}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ArticleGridItem;
