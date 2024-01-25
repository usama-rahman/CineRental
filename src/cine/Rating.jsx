/* eslint-disable react/prop-types */
import Star from "../assets/star.svg";

const Rating = ({ value }) => {
  const Stars = Array(value).fill(Star);
  return (
    <>
      {Stars.map((star, index) => (
        <img key={index} src={Star} width="14" height="14" alt="" />
      ))}
    </>
  );
};

export default Rating;
