import React, { useState, useEffect } from 'react'
import './Home.css'
import Modal from '@material-ui/core/Modal';
import Playlist from './Playlist'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MovieCard from './MovieCard'
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
    marginTop: '20px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Home() {
  const classes = useStyles();
  const [builtlistName, setbuiltlistName] = useState({});
  const [newPlaylistData, setnewPlaylistData] = useState({
    title: ""
  })
  const [searchValue, setSearchValue] = useState("")
  const [movieData, setMovieData] = useState();
  const [open, setOpen] = React.useState(false);
  const [totalPlaylist, settotalPlaylist] = useState([{}])
  const [createPlaylist, setcreatePlaylist] = useState(false)
  const [hide, sethide] = useState("show-create")
  const [track, settrack] = useState(false)
  const [privacyValue, setprivacyValue] = React.useState('private');

  //function for tracking whether Playlist is private or public
  const handleprivacyChange = (event) => {
    setprivacyValue(event.target.value);
  };


  //getRequest for all the playList fetching all playlist
  useEffect(() => {
    console.log(`${process.env.REACT_APP_BACKEND_URL}/api/playlist`)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/playlist`)
      .then(res => res.json())
      .then((data) => {

        settotalPlaylist(data.message)
      })

  }, [track])


  //Function for handling search functionality
  const handleSearch = () => {
    fetch(`https://omdbapi.com/?t=${searchValue}&&plot=full&&apikey=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then((data) => {
        setMovieData(data)
        setSearchValue("");
      })

  }

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  }

  const handleClose = () => {
    setOpen(false)

  }
  const handleOpen = () => {
    setOpen(true);
  }

  //Function for handling change event of available playlist items
  const handleplaylistChange = (event) => {
    const name = event.target.name;
    setbuiltlistName({
      ...builtlistName,
      [name]: event.target.value,
    });
  };



  const handleChangenewList = (e) => {
    setnewPlaylistData({ ...newPlaylistData, [e.target.name]: e.target.value });
  }

  //Function for making request to server for creating new playlist and addig movie to it
  const addnewList = () => {
    let myPromise = new Promise(function (myResolve, myReject) {
      const userId = JSON.parse(localStorage.getItem('userIdValue'));
      newPlaylistData["userId"] = userId;
      newPlaylistData["privacy"] = privacyValue;
      newPlaylistData["movieData"] = movieData;
      setnewPlaylistData(newPlaylistData) //setting value to the state

      myResolve(); // when successful

    })
    myPromise.then(() => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/playlist`, { //making post request for adding movie to playlist
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlaylistData)
      })
        .then(res => res.json())
        .then((data) => {
          settrack(!track)
          setOpen(false)
          newPlaylistData.title = ""
        })
        .catch((err) => {
          alert(err.message);
        })
    })
  }

  //Function for making request to server for adding movie to the available playlist
  const addList = () => {

    let myPromise = new Promise(function (myResolve, myReject) {

      builtlistName["movieData"] = movieData
      setbuiltlistName(builtlistName)
      myResolve(); // when successful

    })
    myPromise.then(() => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/playlist`, { //Making patch request for adding more movies
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(builtlistName)
      })
        .then(res => res.json())
        .then((data) => {
          settrack(!track)
          setOpen(false)
        })
        .catch((err) => {
          alert(err.message)
        })
    })

  }
  return (
    <>
      <div className="home-container">
        <div className="search-bar">
          <input type="search" value={searchValue} onChange={handleChange} />
          <span onClick={handleSearch}>Search</span>
        </div>
        <div className="movie-section">
          {movieData ? movieData.Response !== 'False' ? (
            <MovieCard movieData={movieData} handleOpen={handleOpen} />
          ) : (<span>{movieData.Error}</span>) : (<span>Search for any movie</span>)
          }
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div className="modal-box-card">
              <span className="modal-close-button" onClick={handleClose}>
                X
              </span>
              <div className="list-dropdown">
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="list-native-helper">Playlists</InputLabel>
                  <NativeSelect
                    value={builtlistName.age}
                    onChange={handleplaylistChange}
                    inputProps={{
                      name: '_id',
                      id: 'list-native-helper',
                    }}
                  >
                    <option aria-label="None" value="" />
                    {
                      totalPlaylist.map((data, index) => (
                        <>

                          <option value={data._id}>{data.title}</option>

                        </>
                      ))
                    }
                  </NativeSelect>

                </FormControl>
              </div>
              <span onClick={addList} className="submit-button">click to add</span>
              <div className="show-hide-button">
                <div className={hide} onClick={
                  () => {
                    setcreatePlaylist(true)
                    sethide("hide-create")
                  }}><span> + </span>Create new Playlist</div>

                {
                  createPlaylist ? (<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'fixed' }}>
                    <TextField id="standard-basic" label="Standard" onChange={handleChangenewList} name="title" value={newPlaylistData.title} />
                    <RadioGroup aria-label="gender" name="gender1" value={privacyValue} onChange={handleprivacyChange}>
                      <FormControlLabel value="private" control={<Radio />} label="Public" />
                      <FormControlLabel value="public" control={<Radio />} label="Private" />
                    </RadioGroup>
                    <span className="new-create-button" onClick={addnewList}>Create</span>
                  </div>) : null
                }

              </div>
            </div>
          </Modal>

        </div>
        <div className="playlist-section">
          <Playlist totalPlaylist={totalPlaylist} />
        </div>
      </div>
    </>
  )
}
