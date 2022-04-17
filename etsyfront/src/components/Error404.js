import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <img
        src="404.svg"
        alt="Not Found"
        style={{
          width: '85%',
          height: 'auto',
          display: 'block',
          margin: 'auto',
          position: 'relative',
        }}
      />
    </div>
  );
}
export default NotFound;
