import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Nav = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showSearchAlert, setShowSearchAlert] = useState(false);
  const [searchToggle, setSearchToggle] = useState(true);

  useEffect(() => {
    setSearchValue("");
    setShowSearchAlert(false);
  }, [location]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (searchValue === "") {
      setShowSearchAlert(true);
    } else {
      setShowSearchAlert(false);
      navigate(`/results/${searchValue}`);
    }
  };

  return (
    <>
      <div className="bg-emerald-600 text-white box-border py-6 ">
        <div className="container mx-auto px-3 flex justify-between items-center flex-col md:flex-row">
          <div className="w-[100%] md:w-auto text-left flex justify-between items-center">
            <h1 className="font-title-font-01 text-4xl md:text-5xl font-normal">
              <Link to="/">TheMovieFlix</Link>
            </h1>
            <button
              onClick={() => setSearchToggle(!searchToggle)}
              className="block md:hidden"
            >
              <BsSearch className="text-2xl" />
            </button>
          </div>
          <div className="w-[100%] md:w-auto md:mt-0">
            <div className={`md:block ${searchToggle ? "hidden" : "block"}  `}>
              <form
                onSubmit={onSubmitHandler}
                className="flex items-center text-base mt-5"
              >
                <input
                  type="text"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="rounded text-black outline-0 h-[45px] px-3 w-[100%] md:min-w-[350px] leading-[45px]"
                />
                {/* <input
                  type="submit"
                  value="Submit"
                  className="bg-emerald-400 hover:bg-emerald-500 text-white font-medium rounded h-[45px] ml-2 px-5 cursor-pointer"
                /> */}
                <button
                  onClick={onSubmitHandler}
                  className="bg-emerald-400 hover:bg-emerald-500 text-white font-medium rounded h-[45px] ml-2 px-3 cursor-pointer"
                >
                  <BsSearch className="text-xl" />
                </button>
              </form>
            </div>

            <div className={`search_alert ${showSearchAlert ? "active" : ""}`}>
              Enter keywords to search...
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
