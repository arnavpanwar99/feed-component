import React from 'react';
import Post from './components/Post/Post';
import {
  testString,
  testCaption
} from './string';

function App() {
  return (
    <>
      <Post
       user = 'Arnav Panwar'
       cardStyle = {{}}
       username = 'arnavpanwar99'
       caption = {testCaption} 
       color = '#ff235d' 
       post = {testString} 
       likeCallback = {() => {}}
       disLikeCallback = {() => {}}
       commentCallback = {() => {}}
       shareCallback = {() => {}}
       postURL = ''
       imageURL = ''
      />
    </>
  );
}

export default App;
