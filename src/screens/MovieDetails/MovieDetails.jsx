import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { BsStopwatch, BsStopwatchFill } from 'react-icons/bs';
import YouTube from 'react-youtube';
import {
  doc,
  updateDoc,
  arrayRemove,
  getDoc,
  arrayUnion,
} from 'firebase/firestore';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import { firestoreInstance } from '../../config/firebase';
import { storeUserInfo, userLoadingEnds } from '../../features/user';
import Button from '../../components/Button';
import {
  errorNofication,
  successNofication,
} from '../../features/notification';

const MovieDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const {
    info,
    id: userDocId,
    userLoggedIn,
  } = useSelector((state) => state.user.value);

  const [loading, setLoading] = useState(true);
  const videosDropDown = useRef(null);
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState({ play: false, id: null });
  const apiKey = process.env.TMDB_API_KEY;

  useEffect(() => {
    let mounted = true;

    const endPoint = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=videos`;

    const fetchMovieData = async () => {
      try {
        const response = await fetch(endPoint);

        const data = await response.json();

        if (data && mounted) {
          setMovie(data);
          setLoading(false);
        } else if (mounted) {
          setLoading(false);
        }
      } catch (err) {
        if (mounted) setLoading(false);
      }
    };

    if (!movie) {
      fetchMovieData();
    }

    return () => {
      mounted = false;
    };
  }, [id, movie, apiKey]);

  // hide video drop  down
  useEffect(() => {
    const clickListenerFunc = (e) => {
      if (!e.target.hasAttribute('data-value') && videosDropDown.current) {
        videosDropDown.current.classList.remove('show');
      }
    };

    document.body.addEventListener('click', clickListenerFunc);

    return () => {
      document.removeEventListener('click', clickListenerFunc);
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime - hours * 60;

  let runtime = ``;

  if (minutes !== 0) {
    runtime = `${minutes}m`;
  }

  if (hours !== 0) {
    runtime = `${hours}h ${runtime}`;
  }

  const dislikeMovie = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const userDocRef = doc(firestoreInstance, 'users', userDocId);

      await updateDoc(userDocRef, {
        likedMovies: arrayRemove(movie.id),
      });

      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        dispatch(
          storeUserInfo({
            info: docSnap.data(),
            id: userDocId,
          })
        );
      }

      setLoading(false);
      dispatch(successNofication(`disliked the movie!`));
    } catch (err) {
      dispatch(errorNofication(err.code.slice(5)));
      dispatch(userLoadingEnds());
    }
  };

  const likeMovie = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const userDocRef = doc(firestoreInstance, 'users', userDocId);

      await updateDoc(userDocRef, {
        likedMovies: arrayUnion(movie.id),
      });

      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        dispatch(
          storeUserInfo({
            info: docSnap.data(),
            id: userDocId,
          })
        );
      }

      setLoading(false);
      dispatch(successNofication(`liked the movie!`));
    } catch (err) {
      dispatch(errorNofication(err.code.slice(5)));
      dispatch(userLoadingEnds());
    }
  };

  const addToWatchLaterList = async () => {
    setLoading(true);

    try {
      const userDocRef = doc(firestoreInstance, 'users', userDocId);

      await updateDoc(userDocRef, {
        watchLater: arrayUnion(movie.id),
      });

      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        dispatch(
          storeUserInfo({
            info: docSnap.data(),
            id: userDocId,
          })
        );
      }

      setLoading(false);
      dispatch(successNofication(`Saved to watch later!`));
    } catch (err) {
      dispatch(errorNofication(err.code.slice(5)));
      dispatch(userLoadingEnds());
    }
  };

  const removeFromWatchLaterList = async () => {
    setLoading(true);

    try {
      const userDocRef = doc(firestoreInstance, 'users', userDocId);

      await updateDoc(userDocRef, {
        watchLater: arrayRemove(movie.id),
      });

      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        dispatch(
          storeUserInfo({
            info: docSnap.data(),
            id: userDocId,
          })
        );
      }

      setLoading(false);
      dispatch(successNofication(`Removed from watch later!`));
    } catch (err) {
      dispatch(errorNofication(err.code.slice(5)));
      dispatch(userLoadingEnds());
    }
  };

  const showLoginMessage = () => {
    dispatch(errorNofication('You must login to like movies!'));
  };

  // Video player

  const opts = {
    height: '600',
    width: '1200',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleOnReady = () => {
    // e.target.pauseVideo();
  };

  const showVideoDropDown = () => {
    videosDropDown.current.classList.add('show');
  };

  const setVideoIdAndPlay = (e) => {
    const videoID = e.target.getAttribute('data-id');
    setVideo({ play: true, id: videoID });
  };

  return (
    <Wrapper>
      {video.play && (
        <PlayerWrapper>
          <YouTube videoId={video.id} opts={opts} onReady={handleOnReady} />;
          <div
            className='close'
            onClick={() => setVideo({ play: false, id: null })}
          >
            <AiOutlineClose color='#ffffff' style={{ pointerEvents: 'none' }} />
          </div>
        </PlayerWrapper>
      )}
      <div className='banner'>
        <img
          src={`https://image.tmdb.org/t/p/original/${
            movie.backdrop_path ? movie.backdrop_path : movie.poster_path
          }`}
          alt='/'
        />

        {movie.tagline && (
          <div className='tagline'>
            <span>{movie.tagline}</span>
          </div>
        )}
      </div>

      <div className='details'>
        <div className='top flex'>
          <div className='title_and_btns flex'>
            <div className='title_div'>
              <h2 className='title'>
                {movie.original_title ? movie.title : movie.original_title}
              </h2>
            </div>

            <div className='btns flex'>
              {userLoggedIn && (
                <div className='like_or_dislike flex'>
                  {info.likedMovies.includes(movie.id) ? (
                    <FcLike fontSize='1.3em' onClick={dislikeMovie} />
                  ) : (
                    <FcLikePlaceholder fontSize='1.3em' onClick={likeMovie} />
                  )}
                </div>
              )}

              {!userLoggedIn && (
                <div className='like_or_dislike flex'>
                  <FcLikePlaceholder
                    fontSize='1.3em'
                    onClick={showLoginMessage}
                  />
                </div>
              )}

              {userLoggedIn && (
                <div className='watch_later flex'>
                  {info.watchLater.includes(movie.id) ? (
                    <BsStopwatchFill onClick={removeFromWatchLaterList} />
                  ) : (
                    <BsStopwatch onClick={addToWatchLaterList} />
                  )}
                </div>
              )}

              {movie.videos && movie.videos.results.length !== 0 && (
                <Button
                  type='button'
                  dataVal='playBtn'
                  bgColor='transparent'
                  handleClick={showVideoDropDown}
                >
                  <FaPlay
                    className='play_btns'
                    style={{ pointerEvents: 'none' }}
                  />
                </Button>
              )}

              <div className='videos_dropdown flex' ref={videosDropDown}>
                {movie.videos.results.length !== 0 &&
                  movie.videos.results.map((item, index) => (
                    <span
                      key={item.id}
                      data-id={item.key}
                      onClick={setVideoIdAndPlay}
                    >
                      {index + 1}.&nbsp;&nbsp;{item.type}
                    </span>
                  ))}
              </div>

              {/* ssss */}
            </div>
          </div>

          <p className='overview'>Overview:&nbsp;&nbsp;{movie.overview}</p>
        </div>

        <div className='middle flex'>
          <div className='left'>
            <span className='votes'>Avg votes: {movie.vote_average}</span>

            {movie.genres && (
              <h3 className='generes'>
                Generes:&nbsp;&nbsp;&nbsp;
                {movie.genres.map((item) => (
                  <span key={item.id} className='genere'>
                    {item.name},&nbsp;
                  </span>
                ))}
              </h3>
            )}

            <span className='language'>
              Orignal language: {movie.original_language}
            </span>

            {movie.spoken_languages && (
              <span className='spoken_languages'>
                Spoken Language:{'  '}
                {movie.spoken_languages.map((item) => (
                  <span key={item.iso_639_1}>
                    {item.english_name},&nbsp;&nbsp;
                  </span>
                ))}
              </span>
            )}
          </div>

          <div className='right'>
            {movie.production_companies.length !== 0 && (
              <div className='prod_companies'>
                <span className='prod_comp_heading'>
                  Production companies: &nbsp;
                </span>
                {movie.production_companies.map((item) => (
                  <span key={item.id}>{item.name}, </span>
                ))}
              </div>
            )}

            {movie.production_countries.length !== 0 && (
              <div className='prod_countries'>
                <span className='prod_cont_heading'>
                  Production countries: &nbsp;
                </span>
                {movie.production_countries.map((item) => (
                  <span key={item.iso_3166_1}>{item.name}, </span>
                ))}
              </div>
            )}

            {runtime !== '' && (
              <span className='runtime'>Runtime: &nbsp;&nbsp;{runtime}</span>
            )}

            {movie.status !== '' && (
              <span className='status'>Status: &nbsp;&nbsp;{movie.status}</span>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 20px 0 30px;

  .banner {
    width: 100%;
    height: 500px;
    overflow: hidden;
    border-radius: 5px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .tagline {
      position: absolute;
      bottom: 0;
      right: 35px;
      padding: 4px 8px;
      background-color: rgba(0, 0, 0, 0.9);
      border-radius: 1px;

      span {
        font-size: 0.8em;
        font-weight: 400;
        letter-spacing: 1px;
      }
    }
  }

  .details {
    padding: 0 0px 0 33px;
    margin-top: 15px;

    .top {
      flex-direction: column;
      align-items: flex-start;

      .title_and_btns {
        justify-content: space-between;
        width: 96.5%;
        margin-bottom: 10px;

        .title {
          font-size: 1.4em;
          font-weight: 500;
          letter-spacing: 1px;
        }

        .btns {
          font-size: 1.45em;
          position: relative;
          justify-content: space-between;
          width: 20%;

          .like_or_dislike:hover {
            cursor: pointer;
          }

          .like_or_dislike {
          }

          .watch_later {
          }

          .watch_later:hover {
            cursor: pointer;
          }

          .play_btns:hover {
            cursor: pointer;
          }

          .videos_dropdown {
            position: absolute;
            bottom: 125%;
            right: 0;
            z-index: 2;
            background: #2da8ce;
            width: 220px;
            max-height: 400px;
            padding: 8px 10px;
            border-radius: 10px;
            flex-direction: column;
            align-items: flex-start;
            overflow-y: scroll;
            opacity: 0;
            pointer-events: none;

            span {
              width: 100%;
              padding: 8px;
              font-size: 0.7em;
            }

            span:hover {
              background-color: #fff;
              color: black;
              font-weight: 400;
              border-radius: 4px;
              cursor: pointer;
            }
          }

          .videos_dropdown.show {
            opacity: 0.95;
            pointer-events: all;
          }
        }
      }

      .overview {
        font-size: 0.9em;
        padding: 4px 0 0 0;
      }
    }

    .middle {
      margin-top: 18px;
      justify-content: space-between;
      align-items: flex-start;

      .left {
        .votes {
          font-size: 1em;
          display: block;
        }

        .generes {
          margin-top: 10px;
          font-size: 1em;
          font-weight: 400;

          .genere {
            margin: 0px;
          }
        }

        .language {
          margin-top: 8px;
          display: block;
        }

        .spoken_languages {
          font-size: 1em;
          margin-top: 8px;
          display: block;
        }
      }

      .right {
        width: 57%;
        .prod_companies {
          .prod_comp_heading {
            font-weight: 500;
          }
        }

        .prod_countries {
          margin-top: 10px;
          .prod_cont_heading {
            font-weight: 500;
          }
        }

        .runtime {
          margin-top: 5px;
          display: block;
        }

        .status {
          margin-top: 5px;
        }
      }
    }
  }
`;

const PlayerWrapper = styled.main`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  display: grid;
  place-content: center;
  background: rgba(0, 0, 0, 0.9);
  z-index: 5;

  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 2em;
    z-index: 6;
  }

  .close:hover {
    cursor: pointer;
  }
`;

export default MovieDetails;
