import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';

const MovieCard = ({Data})=>{
    return (
        <>
        <div className="list-details-section">
         {
             Data.movies.map((data,index)=>(
                 <div className="movie-card">
        <img src={data.Poster} alt="movie-poster" />
        <div className="movie-content" style={{ display: 'flex', flexDirection: 'column', padding: '14px' }}>
          <div className="short-details-section" style={{ marginBottom: '12px', margin: '0px 0px 12px 7px' }}>
            <h3>{data.Title}</h3>
            <span className="short-details" style={{ fontSize: '.8em' }}>
              `{data.Rated} / {data.Runtime} / {data.Genre}`
            </span>
          </div>
          <div className="movie-summary">
            <h4>
              SUMMARY
            </h4>
            <span style={{ marginTop: '8px', fontSize: '13px', fontStyle: 'italic', fontFamily: 'serif' }}>
              {data.Plot}
            </span>
            <span className="actors-name">{data.Actors}</span>
          </div>
        </div>
        <div style={{
            height: '43px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right'
        }}>
            
          </div>
      </div>
    ))
} 
        
    </div>
        
</>
    )
}
export default function Listdetails() {

    const [movieData, setmovieData] = useState()
    let {id} = useParams();
useEffect(() => {
  
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/listDetails/${id}`)
    .then((res)=>res.json())
    .then((data)=>{
        setmovieData(data.response)
        // console.log("list film data",data.response)
    }).catch((err)=>{
        console.log(err)
    })
}, [])

  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        {
            movieData?.map((data,index)=>(
               
                <MovieCard Data = {data}/>
            ))
        }
    </div>
  )
}
