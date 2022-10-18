import POTGPreview from './POTGPreview';

const HomeContent = ({ filteredPosts }) => {

  return (
    <div>
      {filteredPosts.map((post) => (
        <POTGPreview key={post.id} props={post} />
      ))}
    </div>
  );
}


export default HomeContent;
