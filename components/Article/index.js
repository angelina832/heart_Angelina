import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';

import React from 'react';

import Diff from 'react-diff';

import agent from '../../agent';
import { connect } from 'react-redux';
import marked from 'marked';

import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: ARTICLE_PAGE_UNLOADED })
});


class Article extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Articles.get(this.props.params.id),
      agent.Comments.forArticle(this.props.params.id)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.article) {
      return null;
    }
    const oldCode = `
              const a = 10
              const b = 10
              const c = () => console.log('foo')

              if(a > 10) {
                console.log('bar')
              }

              console.log('done')
              `;

    const newCode = `
              const a = 10
              const boo = 10

              if(a === 10) {
                console.log('bar')
              }
              `;

    const markup = this.props.article.body;    
    const canModify = this.props.currentUser &&
    this.props.currentUser.username === this.props.article.author.username;

    if(this.props.article.prev_article){

    const markup2 = this.props.article.prev_article.body;
    console.log(this.props.article.prev_article)
    console.log(markup, markup2);
    return (
      <div className="article-page">

        <div className="banner">
          <div className="container">
            <h1>{this.props.article.tagList[0]}</h1>
            <ArticleMeta
              article={this.props.article}
              canModify={canModify} />
          </div>
        </div>

        <div className="container page">

          <div className="row article-content">
            <div className="col-xs-12">
              <Diff inputA={String(markup2)} inputB={String(markup)} type="chars" />
            </div>
          </div>

          <hr />

          <div className="article-actions">
          </div>

        </div>
      </div>
    );
    }

    return (
      <div className="article-page">

        <div className="banner">
          <div className="container">
            <h1>{this.props.article.tagList[0]}</h1>
            <h3>{this.props.article.title}</h3>
            <ArticleMeta
              article={this.props.article}
              canModify={canModify} />
          </div>
        </div>

        <div className="container page">

          <div className="row article-content">
            <div className="col-xs-12">
              <div dangerouslySetInnerHTML={markup}></div>
            </div>
          </div>

          <hr />

          <div className="article-actions">
          </div>

          <div className="row">
            <CommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.params.id}
              currentUser={this.props.currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
