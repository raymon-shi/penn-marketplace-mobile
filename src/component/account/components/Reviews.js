import React from 'react';
import GrayStar from '../assets/gray-star.png';
import YellowStar from '../assets/yellow-star.png';

const Reviews = ({ userData }) => {
  function generateRatingComponent(numStars) {
    const stars = Array(5).fill(<img src={GrayStar} alt="Yellow star." />);
    for (let i = 0; i < numStars; i += 1) {
      stars[i] = (<img src={YellowStar} alt="Yellow star." />);
    }
    return stars;
  }

  return (
    <div>
      <div style={{ width: '100%' }}>
        <h1>Reviews</h1>
      </div>
      <div id="reviews">
        <div style={{ padding: '1% 2%' }}>
          {userData.reviews.map((review) => (
            <div className="review" key={review.pennID}>
              <div style={{ margin: '1%' }}>
                <div className="flex">
                  <div className="rating">
                    {generateRatingComponent(review.stars)}
                  </div>
                  &nbsp;
                  {review.name}
                </div>
                <div>
                  {review.review}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
