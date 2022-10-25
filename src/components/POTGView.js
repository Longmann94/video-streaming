const POTGView = ({ clip }) => {

  return (
    <div className='POTG-view'>
      <h1>{clip.title}</h1>
      <iframe width='1300' height='700' src={clip.url} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowFullScreen"></iframe>
      <div> upvotes and other interactions for user to react to clip </div>
      <div> comments goes here </div>
    </div>
  );
}

export default POTGView;
