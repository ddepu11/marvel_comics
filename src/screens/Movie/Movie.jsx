import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../../components/Loading';

const Movie = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.TMDB_API_KEY;

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=videos`;

    const fetchMovieData = async () => {
      try {
        const response = await fetch(endPoint);

        const data = await response.json();

        if (data) {
          setMovie(data);
          setLoading(false);
          console.log(data);
        } else {
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    if (!movie) {
      fetchMovieData();
    }
  }, [id, movie, apiKey]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
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
          <h2 className='title'>
            {movie.original_title ? movie.title : movie.original_title}
          </h2>
          <p className='overview'>Overview:&nbsp;&nbsp;{movie.overview}</p>
        </div>

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
              <span key={item.iso_639_1}>{item.english_name},&nbsp;&nbsp;</span>
            ))}
          </span>
        )}
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

      .title {
        font-size: 1.4em;
        font-weight: 500;
        letter-spacing: 1px;
      }

      .overview {
        font-size: 0.9em;
        padding: 4px 0 0 0;
      }
    }

    .votes {
      font-size: 1em;
      margin-top: 8px;
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
`;

export default Movie;
