import React from 'react'

export default function MovieCard({movieData,handleOpen}) {
  return (
    <>
    <div className="movie-card">
              <img src={movieData.Poster} alt="movie-poster" />
              <div className="movie-content" style={{ display: 'flex', flexDirection: 'column', padding: '14px' }}>
                <div className="short-details-section" style={{ marginBottom: '12px', margin: '0px 0px 12px 7px' }}>
                  <h3>{movieData.Title}</h3>
                  <span className="short-details" style={{ fontSize: '.8em' }}>
                    `{movieData.Rated} / {movieData.Runtime} / {movieData.Genre}`
                  </span>
                </div>
                <div className="movie-summary">
                  <h4>
                    SUMMARY
                  </h4>
                  <span style={{ marginTop: '8px', fontSize: '13px', fontStyle: 'italic', fontFamily: 'serif' }}>
                    {movieData.Plot}
                  </span>
                  <span className="actors-name">{movieData.Actors}</span>
                </div>
              </div>
              <div style={{
                height: '43px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'right'
              }}><span className="add-playlist-button" onClick={handleOpen}>
                  Add to Playlist
                </span></div>
            </div>
    </>
  )
}
