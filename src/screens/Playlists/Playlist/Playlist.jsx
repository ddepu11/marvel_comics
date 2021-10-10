import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import Loading from '../../../components/Loading';
import Movie from '../../Movie/Movie';
import Button from '../../../components/Button';
import { firestoreInstance } from '../../../config/firebase';
import { errorNofication } from '../../../features/notification';

const Playlist = ({ item, index }) => {
  const dispatch = useDispatch();

  const apiKey = process.env.TMDB_API_KEY;
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const newMovies = [];

    item.movies.forEach(async (movieID, i) => {
      const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US&append_to_response=videos`;

      try {
        const response = await fetch(endPoint);

        const data = await response.json();

        if (data && mounted) {
          newMovies.push(data);
        }

        if (i === item.movies.length - 1) {
          if (mounted) {
            setMovies(newMovies);
            setLoading(false);
          }
        }
      } catch (err) {
        if (mounted) setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [apiKey, item.movies]);

  const removeFromPlaylist = async (e) => {
    setLoading(true);

    const mId = e.target.getAttribute('data-value');

    try {
      const playlistDocRef = doc(firestoreInstance, 'playlists', item.id);

      await updateDoc(playlistDocRef, {
        movies: arrayRemove(+mId),
      });

      setMovies((prevMovies) => [...prevMovies.filter((i) => i.id !== +mId)]);

      setLoading(false);
    } catch (err) {
      dispatch(errorNofication(err.code.slice(5)));
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading size='4vh' />;
  }

  return (
    <Wrapper>
      <h2 className='name'>
        {index + 1}.&nbsp;
        {item.name}
      </h2>

      {movies.length !== 0 ? (
        <div className='movies'>
          {movies.map((m) => (
            <div className='movie' key={m.id}>
              <Button
                type='button'
                bgColor='transparent'
                fs='1.5em'
                color='#bd2222'
                dataVal={m.id.toString()}
                handleClick={removeFromPlaylist}
              >
                <AiFillDelete style={{ pointerEvents: 'none' }} />
              </Button>

              <Movie movie={m} />
            </div>
          ))}
        </div>
      ) : (
        <h2 className='no_movies'>you haven&rsquo;t added any movie yet!</h2>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  margin-bottom: 30px;
  padding-bottom: 10px;

  .name {
    font-weight: 400;
    font-size: 1.8em;
    padding: 10px 0;
  }

  .movies {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 30px;

    .movie {
      position: relative;
    }
  }

  .no_movies {
    font-weight: 400;
    font-size: 1.1em;
    padding: 10px 0;
    margin-left: 30px;
  }
`;

Playlist.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Playlist;