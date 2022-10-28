import RecommendedTags from './components/RecommendedTags';
import HomeContent from './components/HomeContent';

const App = ({recommendedTagsArr, clipsArr, handleClickPopularTags }) => {

  return (
    <div>
      <div className="main-container">

        <RecommendedTags recommendedTagsArr={recommendedTagsArr} handleClickPopularTags={handleClickPopularTags} />
        <HomeContent clipsArr={clipsArr} />

      </div>

    </div>
  );
}

export default App;
