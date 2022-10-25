import { Link } from 'react-router-dom';

const POTGPreview = ({ clip }) => {

  return (
    <Link to={clip.id}>
      <div className="POTG-preview">
        <img src={clip.thumbnailUrl} />
        <div className="POTG-title">
          <h3>{clip.title}</h3>
        </div>
        <div className="POTG-runtime">
          <h4>Epic! votes: {clip.epic.length}</h4>
        </div>
      </div>
      </ Link>
  );
}

export default POTGPreview;
