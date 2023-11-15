import React from 'react';
import { Image } from '@chakra-ui/react';

function ThumbnailPreview ({ url }) {
  // USED https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  // for checking if valid url

  const isValidHttpUrl = (string) => {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  // USED https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
  // to get the regex

  const getYouTubeVideoId = (url) => {
    if (!isValidHttpUrl(url)) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(url);

  if (videoId) {
    return (
      <iframe
        title="YouTube video player"
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen
      />
    );
  } else if (url) {
    return (
      <Image src={url} alt="Thumbnail preview" maxWidth="50vw" objectFit='contain' rounded='lg'/>
    );
  }

  return null;
}

export default ThumbnailPreview;
