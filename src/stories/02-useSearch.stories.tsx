import React from 'react';

import useSearch from '../hooks/useSearch';

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
  const { filteredItems, onSearch } = useSearch(posts, 'name');
  return (
    <div>
      <input type="text" onChange={event => onSearch(event.currentTarget.value)} />
      <ul>
        {filteredItems.map(post => (
          <li key={post.id}>{post.name}</li>
        ))}
      </ul>
    </div>
  );
};

UseSearch.story = {
  name: 'useSearch'
};
