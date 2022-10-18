
const POTGPreview = (props) => {

  return (
    <div className="POTG-preview">
      <img src={props.props.thumbnailUrl} />
      <div className="POTG-title">
        {props.props.title}
      </div>
      <div className="POTG-runtime">
        {props.props.runtime}
      </div>
    </div>
  );
}

export default POTGPreview;
