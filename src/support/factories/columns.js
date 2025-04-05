export const title = {
  title: 'Title',
  renderFunc: (_a, _b, { title }) => title,
  renderExport: ({ title }) => title,
  sortable: 'title',
};

export const artist = {
  title: 'Artist',
  renderFunc: (_a, _b, { artist }) => artist,
  renderExport: ({ artist }) => artist,
  sortable: 'artist',
};

export const genre = {
  title: 'Genre',
  renderFunc: (_a, _b, { genre }) => genre,
  renderExport: ({ genre }) => genre,
  sortable: 'genre',
};

export const releaseYear = {
  title: 'Released',
  renderFunc: (_a, _b, { releaseYear }) => releaseYear,
  renderExport: ({ releaseYear }) => releaseYear,
  sortable: 'releaseYear',
};

export const rating = {
  title: 'Rating',
  renderFunc: (_a, _b, { rating }) =>
    [...new Array(rating)]
      .map(() => {
        return '★';
      })
      .join(''),
  renderExport: ({ rating }) => rating,
  sortable: 'rating',
};

export default [title, artist, releaseYear, genre, rating];
