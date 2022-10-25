import RecommendedTags from './components/RecommendedTags';
import HomeContent from './components/HomeContent';

const App = (props) => {

  return (
    <div>
      <div className="main-container">

        <RecommendedTags />
        <HomeContent clipsArr={props.clipsArr} />

      </div>

    </div>
  );
}

export default App;
