import React,{useState} from 'react'
import './Playlist.css'
import { Link,useNavigate } from "react-router-dom";

export default function Playlist({totalPlaylist}) {

  return (
    <>
    <h2 style={{color: 'white',fontSize: '3rem',marginTop: '72px'}}>All Playlist</h2>
    <div className="playlist-container">
{


totalPlaylist.map((data,index)=>(
<div>
  <Link to={`/listid/${data._id}`}><div className="playlist-card" key={index}>
       {data.title}
  </div>
  </Link>
</div>
  ))
  
      
}
    </div>
    </>
  )
}
