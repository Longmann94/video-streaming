import './css/style.css';
import Header from './components/Header';
import Search from './components/Search';
import RecommendedTags from './components/RecommendedTags';
import HomeContent from './components/HomeContent';
import { useState, useEffect } from 'react';

const App = () => {

  const posts = [
    { id: '1', title: 'Dva Epic plays', thumbnailUrl: 'https://picsum.photos/150', runtime: '0:25' },
    { id: '2', title: '5 man teamwipe', thumbnailUrl: 'https://picsum.photos/150', runtime: '0:35'},
    { id: '3', title: 'pls no hate', thumbnailUrl: 'https://picsum.photos/150', runtime: '0:26'},
    { id: '4', title: 'this hero is broke', thumbnailUrl: 'https://picsum.photos/150', runtime: '0:32'},
];

const filterPosts = (posts, query) => {
    if (!query) {
        return posts;
    }

    return posts.filter((post) => {
        const postTitle = post.title.toLowerCase();
        return postTitle.includes(query);
    });
};


const { search } = window.location;
const query = new URLSearchParams(search).get('s');
const [searchQuery, setSearchQuery] = useState(query || '');
const filteredPosts = filterPosts(posts, searchQuery);

  return (
    <div className="body-container">
      <div className="top-container">
        <Header />
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className="main-container">

        <RecommendedTags />
        <HomeContent filteredPosts={filteredPosts} />

      </div>

    </div>
  );
}

export default App;
