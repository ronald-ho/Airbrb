import { Image } from '@chakra-ui/react';
import React from 'react';

function ThumbnailPreview ({ url, alt }) {
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
        title={alt || 'YouTube video player'} // Use 'alt' for the title if provided
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen
      />
    );
  } else if (url) {
    return (
      <Image src={url} alt={alt || 'Thumbnail preview'} objectFit='contain'/>
    );
  }

  return null;
}

export default ThumbnailPreview;
