/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Card, FormField, Loader, Modal } from "../components";

import { downloadImage } from "../utils";

const Home = () => {
  const [allPosts, setAllPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [post, setPost] = useState(null);
  const [prompt, setPrompt] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "https://dall-e-53it.onrender.com/api/v1/post",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post, index) => (
        <Card
          key={post._id}
          _id={post._id}
          {...post}
          setId={setId}
          setShowModal={setShowModal}
          setPost={setPost}
          setPrompt={setPrompt}
          className={`${
            (index + 1) % 6 === 0
              ? "col-span-2 row-span-2"
              : "col-span-1 row-span-1"
          }`}
        />
      ));
    }

    return (
      <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
        {title}
      </h2>
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px] text-center">
          The Community Showcase
        </h1>
        <p className="m-auto mt-2 text-[#666e75] text-[16px] max-w-[500px] text-center">
          Browse through a collection of imaginative and stunning images
          generated by DALL AI
        </p>
      </div>
      <div className="mt-16">
        <FormField
          labelName="Search posts"
          name="text"
          type="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing result for
                <span className="text-[#222328]"> {searchText}</span>
              </h2>
            )}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No search result found"
                />
              ) : (
                <RenderCards data={allPosts} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="flex justify-center items-center relative inset-0">
          <div className="w-full md:w-[480px] m-3 bg-white rounded-t-[14px] rounded-b-[14px]">
            <img src={post} className="rounded-t-[14px]" />
            <div className="mx-10 mt-6 mb-10 flex flex-col items-center text-sm gap-6">
              <h4 className="text-base text-center mx-auto mt-3">{prompt}</h4>
              <div className="mt-3 flex w-full cursor-pointer">
                <button
                  type="button"
                  onClick={() => downloadImage(id, post)}
                  className="grow shrink basis-0 bg-[#ececf1] inline-flex relative pointer-events-auto justify-center transition-all m-0 px-5 py-4 rounded-md hover:opacity-75"
                >
                  <span className="font-semibold">Download for free</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Home;
