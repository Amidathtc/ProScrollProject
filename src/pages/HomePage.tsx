import  { useEffect, useState } from "react";
import {FaChevronLeft, FaChevronRight } from "react-icons/fa";
import pix from "../assets/pexels-martin-de-arriba-7171398.jpg";
import { getData } from "../api/API";

const HomePage = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [view] = useState<number>(12);
  const [page, setPage] = useState<number>(1);

  const lastPage = view * page;
  const firstPage = lastPage - view;
  const myState = data.slice(firstPage, lastPage);

  const totalPages = Math.ceil(data.length / view);

  useEffect(() => {
    getData().then((res: any) => {
      setData(res);
    });
  }, []);

  const maxVisibleButtons = 5; // Maximum number of visible page buttons
  const [visiblePageButtons, setVisiblePageButtons] = useState<number[]>([]);

  useEffect(() => {
    const start = Math.max(1, page - Math.floor(maxVisibleButtons / 2));
    const end = Math.min(totalPages, start + maxVisibleButtons - 1);
    const visibleButtons = Array.from({ length: end - start + 1 }, (_, index) => start + index);
    setVisiblePageButtons(visibleButtons);
  }, [page, totalPages]);

  const handlePrevbtn = () => {
    setPage(page - 1);
  };

  const handleNextbtn = () => {
    setPage(page + 1);
  };

  return (
    <div className="font-main text-[15px]">
      <div className="w-full p-4 flex flex-wrap ">
        {myState.map((props: any) => (
          <div
            key={props.id}
            className="w-[150px] min-h-[200px] border-2 border-[purple] rounded-t-md shadow-inner overflow-hidden m-2 "
            style={{
              boxShadow:
                " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            }}
          >
            <img src={pix} className="w-full h-[150px] object-cover" alt="Item" />
            <div className="mt-4 pl-2 text-[12px]">
              <p>ID: {props.id} </p>
              <p>Name: {props.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center w-full items-center ">
        <ul className="pageNumbers">
          <li>
            <button onClick={handlePrevbtn} disabled={page === 1}>
              <FaChevronLeft />
            </button>
          </li>
          {visiblePageButtons.map((el) => (
            <div
              key={el}
              onClick={() => {
                setPage(el);
              }}
              className={`p-1 ${
                el === page ? "bg-green-500" : "bg-red-500"
              } rounded w-[30px] h-[30px] flex justify-center m-3`}
            >
              {el}
            </div>
          ))}
          <li>
            <button onClick={handleNextbtn} disabled={page === totalPages}>
              <FaChevronRight />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
