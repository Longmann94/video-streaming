import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


const RecommendedTags = ({ recommendedTagsArr, handleClickPopularTags }) => {



  return (
    <div className='recommended-tags'>
      <div className='recommended-tags-popular'>  Popular tags: </div>
      <ButtonGroup variant='outlined' >
        {
          recommendedTagsArr.map((tag) => {
            return(
              <Button key={tag} onClick={handleClickPopularTags} id={tag}>{tag}</Button>
            );
          })
        }
      </ButtonGroup>
    </div>
  );
}

export default RecommendedTags;
