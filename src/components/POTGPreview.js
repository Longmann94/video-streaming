import { Link } from 'react-router-dom';

const POTGPreview = ({ clip }) => {

  return (
    <Link className='link' to={clip.id}>
      <div className="POTG-preview">
        <img src={clip.thumbnailUrl} />
        <div className="POTG-title">
          {clip.title}
        </div>
        <div className="POTG-info">
          <div>Epic! votes: {clip.epic.length}</div>
          <div>uploaded by: {clip.clipOwner}</div>
        </div>
      </div>
    </Link>
  );
}

export default POTGPreview;
