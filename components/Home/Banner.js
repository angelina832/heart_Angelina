import React from 'react';

const Banner = ({ appName, token }) => {
  if (token) {
    return null;
  }
  return (
    <div className="banner">
      <div className="container">
        <p>Be Aware Of What You're Agreeing to!</p>
        <p>Avoid bad agreement</p>
        <p>Avoid accepting bad terms</p>
      </div>
    </div>
  );
};

export default Banner;
