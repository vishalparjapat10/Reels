import React, { useEffect,useState} from 'react';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import {db } from "../firebase";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';

function Post({postData,userData}) {
    console.log("Postdata -> ",postData);
    const [like,setLike] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
      if (postData.likes.includes(userData.uid)) {
        setLike(true);
      }
      else {
        setLike(false);
      }
    }, [postData])
  
    const handleLike = async () => {
      if (like) { //unlike
        await updateDoc(doc(db, "posts", postData.postId), {
          likes: arrayRemove(userData.uid),
        });
      }
      else { //like
        // likes["12345677iuyhtgfrd"]
        await updateDoc(doc(db, "posts", postData.postId), {
          likes: arrayUnion(userData.uid)
        })
      }
    }
  return (
    <div className='post-cont'>
        <video src={postData.postURL}/>
        <div className='video-info'>
        <div className='avatar-cont'>
            <Avatar alt="Remy Sharp" src={postData.profilePhotoURL} sx={{ margin: "0.5rem" }}/>
            <p style={{ color: "white" }}>{postData.profileName}</p>
        </div>
        <div className='post-like'>
            <FavoriteIcon onClick={handleLike} style={like ? {color:"red"}: {color:"white"}}/>
            <p style={{ color: "white" }}>{postData.likes.length}</p>
            <ModeCommentIcon style={{ color: "white" }} onClick={handleClickOpen}/>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth={true}
              maxWidth="md"
              >
                <div className='modal-cont'>
                  <div className='video-modal'>
                    <video src={postData.postURL}/>
                  </div>
                  <div className='comments-modal'>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image="/static/images/cards/contemplative-reptile.jpg"
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Lizard
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary">
                          Share
                        </Button>
                      </CardActions>
                    </Card>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image="/static/images/cards/contemplative-reptile.jpg"
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Lizard
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary">
                          Share
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                </div>
            </Dialog>
        </div>
        </div>
    </div>
  )
}

export default Post