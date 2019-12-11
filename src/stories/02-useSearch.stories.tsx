import React from 'react';

// import useSearch from '../hooks/useSearch';

const posts = [
  { id: 1, name: 'My favorite post' },
  { id: 2, name: 'My least favorite post' },
  { id: 3, name: 'Not a post' },
  { id: 4, name: 'Lets toast!' },
  { id: 5, name: "I'm at the coast" }
];

export default {
  title: 'Search'
};

export const UseSearch = () => {
  return <div>Show input field and and a list here</div>;
};

UseSearch.story = {
  name: 'useSearch'
};
