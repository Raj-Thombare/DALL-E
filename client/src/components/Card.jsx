/* eslint-disable react/prop-types */

const Card = ({
  _id,
  setId,
  prompt,
  photo,
  className,
  setShowModal,
  setPost,
  setPrompt,
}) => {
  const imgModalHandler = (photo, prompt, _id) => {
    setId(_id);
    setPost(photo);
    setShowModal(true);
    setPrompt(prompt);
  };

  return (
    <div
      onClick={() => imgModalHandler(photo, prompt, _id)}
      className={`group relative shadow-card hover:shadow-cardhover hover:cursor-pointer rounded-xl card ${className}`}
    >
      <img className="w-full h-auto object-cover" src={photo} alt={prompt} />
      <div className="group-hover:flex flex-col p-5 justify-between w-full h-full hidden absolute top-0 left-0 group-hover:bg-[#fafafcf2] group-hover:opacity-100 group-hover:transition duration-200 delay-0 ease-in-out">
        <h4 className="text-black text-lg overflow-y-auto font-serif">
          {prompt}
        </h4>
        <div className="text-[#777] text-base">Click to try</div>
      </div>
    </div>
  );
};

export default Card;
