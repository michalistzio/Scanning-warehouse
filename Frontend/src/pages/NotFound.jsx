import React from 'react';

function NotFound() {
    const imageUrl = 'https://cdn4.wpbeginner.com/wp-content/uploads/2013/04/wp404error.jpg'
    return ( 
        <div className="not-found">
          <h1 className="not-found__title">404 - Not Found</h1>
          <p className="not-found__description">Oops! The page you're looking for does not exist.</p>
          <img
            className="not-found__image"
            src = {imageUrl}
            alt="Not Found Illustration"
          />
        </div>
    );
}

export default NotFound;