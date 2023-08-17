import { useEffect, useState } from "react";
import img from "../assets/pexels-martin-de-arriba-7171398.jpg";
import { getData } from "../api/API";
import ReactPaginate from 'react-paginate';


const PraticeHome = () => {
  const [view] = useState<number>(12);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<Array<any>>([]);


   
  const lastPage = view * page;
  const firstPage = lastPage - view;
  const myState = data.slice(firstPage, lastPage);


 

  let pagination: number[] = [];
  for (let i = 1; i <= Math.ceil(data.length / view); i++) {
    pagination.push(i);
  }

  useEffect(() => {
    getData().then((res: any) => {
      setData([...data, ...res]);
    });
  }, []);


  return (
    <div className="font-main text-[15px]">
      <div className="w-full p-4 flex flex-wrap">
        {myState?.map((props: any) => (
          <div
            className="w-[150px] min-h[20px] border-2 border-[purple] rounded-t-md shadow-inner overflow-hidden m-2
            "
            style={{
              boxShadow:
                "rgba(0, 0 ,0 0.05) 0px 6px 24px 0px, rgba(0,0,0, 0.8) 0px 0px 0px 1px ",
            }}
          >
            <img src={img} className="w-full h-[150px] object-cover" />

            <div className="mt-4 pl-2 text-[12px]">
              <p>ID:{props.id}</p>
              <p>Name:</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center w-full">
        {/* {pagination?.map((el: any) => (
          <div
            onClick={() => {
              setPage(el);
            }}
            className={`p-1 ${el === page ? "  bg-green-500" : "bg-red-500"}
           rounded  p-1 w-[30px] h-[30px] flex justify-center m-3`}
          >
            {el}
          </div>
        ))} */}

<div className="flex flex-wrap justify-center w-full">
  <ReactPaginate
    pageCount={Math.ceil(data.length / view)} // Total number of pages
    pageRangeDisplayed={3} // Number of pages to display at a time
    marginPagesDisplayed={1} // Number of pages to display at the start and end
    onPageChange={({ selected }) => setPage(selected + 1)} // Callback when page is changed
    containerClassName="pagination" // Class name for the container
    activeClassName="active" // Class name for the active page
    previousLabel={<i className="fas fa-chevron-left"></i>} // Previous icon
    nextLabel={<i className="fas fa-chevron-right"></i>} // Next icon
    disabledClassName="disabled" // Class for disabled buttons
  />



</div>

      </div>
    </div>
  );
};

export default PraticeHome;
