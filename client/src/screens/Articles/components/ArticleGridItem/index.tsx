import React from 'react';
import { Heading, Box, Button, Image } from 'grommet';
import { Favorite, Chat } from 'grommet-icons';

import styles from './styles.module.scss';

const ArticleGridItem = ({ item }) => {
  return (
    // TODO make box clickable with redirect to current article
    <Box
      flex
      margin='medium'
      background={{ color: '#fff' }}
      round='xsmall'
      width={{ max: '300px' }}
      height={{ max: '300px' }}
      elevation='xsmall'
      className={styles.container}
    >
      <Box height='200px' round={{ size: 'xsmall', corner: 'top' }}>
        <Image
          fit='cover'
          src={
            item.imageLink
              ? item.imageLink
              : '//v2.grommet.io/assets/Wilderpeople_Ricky.jpg'
          }
        />
      </Box>
      <Box pad='17px' className={styles.cardBody}>
        <Heading level='3' color='dark-1'>
          {item.title}
        </Heading>
        {item.subtitle && (
          <Heading level='4' color='dark-3'>
            {item.subtitle}
          </Heading>
        )}
      </Box>
      <Box
        pad='17px'
        className={styles.cardFooter}
        direction='row'
        wrap
        border={{ side: 'top', color: 'light-2', size: 'xsmall' }}
      >
        <Button
          color='dark-3'
          plain
          icon={<Chat size='medium' color='dark-3' />}
          label={`${item.commentCount}`}
          margin={{ right: '15px' }}
          className={styles.cardFooterButton}
        />
        <Button
          color='dark-3'
          plain
          icon={<Favorite color='dark-3' />}
          label={`${item.likeCount}`}
        />
      </Box>
    </Box>
  );
};

export default ArticleGridItem;
