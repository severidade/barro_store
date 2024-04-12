import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  id: string;
}

function VideoPlayer({ id }: VideoPlayerProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoReady = () => {
    setVideoLoaded(true);
  };

  return (
    <div className={ styles.container_video }>
      {/* {!videoLoaded && (
        <img
          src={ `https://img.youtube.com/vi/${id}/maxresdefault.jpg` }
          alt="Thumbnail do vídeo"
          className={ styles.thumbnail }
        />
      )} */}

      <ReactPlayer
        className={ `${styles.video} ${videoLoaded ? styles.visible : styles.hidden}` }
        // url={ `https://www.youtube.com/watch?v=${id}&start=30` }
        url={ `https://www.youtube.com/embed/${id}?start=30&autoplay=1&loop=1&controls=0&showinfo=0` }
        playing
        loop
        muted
        controls={ false }
        width="100%"
        height="100%"
        onReady={ handleVideoReady }
      />
    </div>
  );
}

export default VideoPlayer;
