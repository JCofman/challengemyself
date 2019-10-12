import React, { useState, useEffect } from 'react';
import style from './challengeView.css';
import fallbackImg from '../../assets/fallback-image.jpeg';

const ChallengeView = () => {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    // TODO: fetch image from firebase of unsplash
    fetch('https://images.unsplash.com/photo-1500933964569-522caa01ca2e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2252&q=80')
      .then((response) => {
        // no response for fetch request, use fallback image!
        if (!response) {
          setImgUrl(fallbackImg);
        }
        console.log(response);
        setImgUrl(response.url);
        return response;
      }, (e) => {
        console.error(e);
      });
  }, []);

  return (
    <div class={style.root}>
      <div class={style.heroImage} style={{ 'background-image': `url('${imgUrl}')` }} />
      <div style={{ display: 'flex', 'justify-content': 'space-between', 'align-items': 'center' }}>
        <div class={style.backToOverview}>Back to Overview</div>
      </div>
      <div style={{ display: 'flex', 'justify-content': 'center', 'align-items': 'center', width: '100%', height: '100%' }}>
        <div class={style.daysToGo}></div>
      </div>
    </div>
  );
}


export default ChallengeView;


