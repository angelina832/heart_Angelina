import ArticlePreview from './ArticlePreview';
import ListPagination from './ListPagination';
import React from 'react';

const ArticleList = props => {
  if (!props.articles) {
    return (
      <div className="article-preview"></div>
    );
  }

  if (props.articles.length === 0) {
    return (
      <div className="article-preview">
        No updates are here... yet.
      </div>
    );
  }
  /*
  var newList = {};
  var newCounter = {};
  for(var article in props.articles){
    if(article.tagList && article.tagList.length != 0)
      {
        if(newList[String(article.tagList[0])]=== undefined){
          newCounter[String(article.tagList[0])] = 0;
        }
        newCounter[String(article.tagList[0])] = 0;
        newList[String(article.tagList[0])]= article;
      }
  };
  props.articles = Object.values(newList);
  articlesCount = newList.length;*/
  return (
    <div>
      {
        props.articles.map(article => {
          return (
            <ArticlePreview article={article} key={article.slug} />
          );
        })
      }

      <ListPagination
        pager={props.pager}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default ArticleList;
