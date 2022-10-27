import Button from '@mui/material/Button';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import TextField from '@mui/material/TextField';


const POTGView = ({ clip, handleChangeComment, handleSubmitUserComment }) => {

  return (
    <div className='POTG-view'>
      <div className='POTG-view-title'>{clip.title}</div>
      <iframe className='POTG-view-video' src={clip.url} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowFullScreen"></iframe>
      <div className='POTG-view-interact-bar'>
        <div>epic! votes: {clip.epic.length}</div>
        <Button variant='contained' sx={{color: '#FFFFFF', backgroundColor: '#f99e1a'}} endIcon={<ThumbUpOutlinedIcon />}> Epic! </Button>
      </div>
      <div className='POTG-view-comments-section'>
        <div className='POTG-view-comments-interact-bar'>

          <TextField
            id="user-comment"
            label="Comment"
            color='warning'
            multiline
            placeholder="Leave a comment..."
            sx={{
              width: 800
            }}
            onChange={handleChangeComment}
          />
          <Button variant='contained' onClick={handleSubmitUserComment} sx={{color: '#FFFFFF', backgroundColor: '#f99e1a'}} >comment</Button>
        </div>
        {
          clip.comments.length === 0 && <b>no comments yet...be the first!</b>
        }
        {
          clip.comments.map((comment) => {

            return (
              <div key={comment.id} className='POTG-view-comment'>
                <div className='POTG-view-comment-author'>
                  <b>{comment.displayName}:</b>
                </div>
                <div className='POTG-view-comment-content'>
                  {comment.message}
                </div>
                <div>
                  upvotes: {comment.upvote}
                </div>
              </div>)
          })
        }
      </div>
    </div>
  );
}

export default POTGView;
