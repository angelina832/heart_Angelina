import React from 'react';
import { Link } from 'react-router';
import agent from '../agent';
import { connect } from 'react-redux';

import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../constants/actionTypes';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: ARTICLE_FAVORITED,
    payload: agent.Articles.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: ARTICLE_UNFAVORITED,
    payload: agent.Articles.unfavorite(slug)
  })
});

const ArticlePreview = props => {
  const article = props.article;
  const favoriteButtonClass = article.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (article.favorited) {
      props.unfavorite(article.slug);
    } else {
      props.favorite(article.slug);
    }
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <div className="info">
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>
      </div>

      <Link to={`updates/${article.slug}`} className="preview-link">
        <h1>{article.tagList[0]}</h1>
        <p>
        {article.title}
        {article.description}
        </p>
        <span>Read more...</span>
      </Link>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
