import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';


const superagent = superagentPromise(_superagent, Promise);

const API_ROOT = 'https://mountain-macaroni-67sgr2mswo.glitch.me/api';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const Tags = {
  getAll: () => requests.get('/domains')
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined })
const Articles = {
  all: page =>
    requests.get(`/updates?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/updates?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/updates?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug =>
    requests.del(`/updates/${slug}`),
  favorite: slug =>
    requests.post(`/updates/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/updates?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/updates/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/updates/${slug}`),
  unfavorite: slug =>
    requests.del(`/updates/${slug}/favorite`),
  update: article =>
    requests.put(`/updates/${article.slug}`, { article: omitSlug(article) }),
  create: article =>
    requests.post('/updates', { article })
};

const Comments = {
  create: (slug, comment) =>
    requests.post(`/updates/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/updates/${slug}/comments/${commentId}`),
  forArticle: slug =>
    requests.get(`/updates/${slug}/comments`)
};

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags,
  setToken: _token => { token = _token; }
};
