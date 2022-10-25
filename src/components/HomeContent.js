import POTGPreview from './POTGPreview';

const HomeContent = (props) => {

  return (
    <div className="home-content">
      {props.clipsArr.map((clip) => {
        return <POTGPreview key={clip.id} clip={clip} />
      })}
    </div>
  );
}


export default HomeContent;
