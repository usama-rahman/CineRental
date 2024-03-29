/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useState } from "react";
import { getImgUrl } from "../utils/cineUtility";
import Rating from "./Rating";
import MoviDetailsModal from "./MoviDetailsModal";
import { MovieContext } from "../context";
import { toast } from "react-toastify";

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  // const { cartData, setCartData } = useContext(MovieContext);
  const { state, dispatch } = useContext(MovieContext);

  const handleModalClose = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  const handleMovieSelection = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleAddToCart = (e, movie) => {
    e.stopPropagation();

    const found = state.cartData.find((item) => {
      return item.id === movie.id;
    });

    if (!found) {
      // setCartData([...cartData, movie]);
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          ...movie,
        },
      });

      toast.success(`Added ${movie.title} to Cart!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      // toast.success("Success Notification !", {
      //   position: toast.POSITION.BOTTOM_RIGHT,
      // });
    } else {
      toast.error(
        `The Movie ${movie.title} has been added to the cart already`,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
    }
  };

  return (
    <>
      {showModal && (
        <MoviDetailsModal
          selectedMovie={selectedMovie}
          handleModalClose={handleModalClose}
          onCartAdd={handleAddToCart}
        />
      )}
      <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
        <a href="#" onClick={() => handleMovieSelection(movie)}>
          <img
            className="w-full object-cover"
            src={getImgUrl(movie.cover)}
            alt={movie.title}
          />
          <figcaption className="pt-4">
            <h3 className="text-xl mb-1"> {movie.title} </h3>
            <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
            <div className="flex items-center space-x-1 mb-5">
              <Rating value={movie.rating} />
            </div>
            <button
              className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
              href="#"
              onClick={(e) => handleAddToCart(e, movie)}
            >
              <img src="./assets/tag.svg" alt="" />
              <span>${movie.price} | Add to Cart</span>
            </button>
          </figcaption>
        </a>
      </figure>
    </>
  );
};

export default MovieCard;
