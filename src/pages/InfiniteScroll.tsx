import { getData } from "../api/API"
import pix from "../assets/pexels-martin-de-arriba-7171398.jpg"
import { useState, useEffect } from "react"

const InfiniteScroll = () => {

    const [data, setData] = useState<Array<any>>([])
    const [state, setState] = useState<Array<any>>([])
    const [view] = useState<number>(12)
    const [page, setPage] = useState<number>(2)

    const lastPage = view * page
    const firstPage = lastPage - view
    const myState = data.slice(firstPage, lastPage)

    


    useEffect(() => {
        getData().then((res: any) => {

            setData([...data, ...res])
            setState([...state, ...myState])

        })
    }, [firstPage, lastPage, page])

    console.log(state)

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            console.log("I can Change")
            setPage(el => el + 1)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])


    return (
        <div className='font-main text-[15px]' >
            <div className="w-full p-4 flex flex-wrap " >
                {
                    state?.map((props: any) => (
                        <div className="w-[150px] min-h-[200px] border-2 border-[purple] rounded-t-md shadow-inner overflow-hidden m-2 "
                            style={{
                                boxShadow: " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
                            }}
                        >
                            <img
                                src={pix}
                                className="w-full h-[150px] object-cover"
                            />

                            <div className="mt-4 pl-2 text-[12px]" >
                                <p>ID: {props.id}</p>
                                <p>Name: </p>
                            </div>
                        </div>
                    ))
                }
            </div>

            
        </div>
    )
}

export default  InfiniteScroll 