import * as React from "react";
import "../styles.css";
import TableCard from "./TableCard";


const Pagination = ({ totalPages, currentPage, onClickCallback }) => {
  const pages = new Array(totalPages).fill(0).map((a, i) =>
    i + 1 === currentPage ? (
      <button disabled style={{ background: "olive" }} key={i}>
        {i + 1}
      </button>
    ) : (
      <button onClick={() => onClickCallback(i + 1)} key={i}>
        {i + 1}
      </button>
    )
  );
  return <div className="pagination">{pages}</div>;
};

export default function DataTable() {
  const [data, setData] = React.useState([]);
  const [datas, setDatas] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [loading, setIsLoading] = React.useState(true);
  const [totalPages, setTotalPages] = React.useState(null);
  const [row, setRow] = React.useState([]);
  const getUsers = ({ page = 1 }) => {
    return fetch(`http://localhost:3000/data`).then((res) =>
      res.json()
    );
  };

  const handleDelete = async (id) => {
    console.log(id)
    try{
        await fetch(`http://localhost:3000/data/${id}`,{
            method: "DELETE",
        })
    }
    catch(err){
        console.log(err);
    }
    // setData(data.filter((item) => item.id !== id));
    getUsers();
}
const l = data.length
  React.useEffect(() => {
    getUsers({
      page,
    })
      .then((res) => {
        setRow(res);
        setData(res);
        console.log(res);
        if (res.length) {
          const totalPages = Math.ceil(res.length / 5);
          setTotalPages(totalPages);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
   
  }, [data]);
  React.useEffect(() => {
    setData(
      row?.filter((item) => {
        if (datas === "") {
          return item;
        } else if (
          item.phone
            .toLowerCase()
            .split(" ")
            .join("")
            .includes(datas.toLowerCase())
        ) {
          return item;
        }
      })
    );

    console.log(datas);
  }, [datas]);

  const handlePageChange = (value) => {
    setPage(value);
  };

  /*
  const [post,setPost]=[]
  const [curr]
  [postperpage]
  */
  const indexOflastPost = page * totalPages;
  const indexOffirst = indexOflastPost - totalPages;
  const currpost = data.slice(indexOffirst,indexOflastPost)

  if (loading) return <div>Loading...</div>;
  return (
    <>
    <div style={{ height: 400, width: "100%" }}>
      <div className="ButtonBox">
        <div>
          <input
            type="number"
            placeholder="Search contacts"
            value={datas}
            onChange={(e) => setDatas(e.target.value)}
          />
        </div>
        <div>
          <button>View</button>
          <button>Edit</button>
          <button>Status </button>
          <button>
            Send
            <img
              style={{ width: "12px", margin: "0 10px" }}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAiklEQVRIie2Tuw2AMAwFDxghu1CwFLAJEp8CJmIqaFxYQYEEI6o8KVKKlzsXDuTkWFOpews0wG7gFUAP1D7HAYecRYpv4IviOL8wGSQ+fAqVRlXagDISrodb796lSpLgIUnoUWzvlcQEf4J8AtcSvR2zHOtKXyR64k8mf5JEw1M/Uyf3QUQ5OT/kBEmoPwh1vkJ1AAAAAElFTkSuQmCC"
            />
          </button>
          <button onClick={()=>{if(page=== 1){return false} setPage(page-1) }}>
          {"<"}
          </button>
          <button onClick={()=>{if(page=== data.length/5){return false} setPage(page+1) }}> 
           {">"}
           </button>
          <button>...</button>
        </div>
      </div>
      {/* <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      /> */}
      <div className="TableBox">
        <div className="name">Name</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Status</div>
        <div>Date</div>
      </div>
      {
        currpost?.map((item)=>{
          return (<TableCard
          key={item.id}
          email={item.email}
          name={item.name}
          phone={item.phone}
          status={item.status}
          date={item.date}
          handleDelete={()=>handleDelete(item.id)}
          />)
          })
      }
      <div className="TableBox">
    <Pagination
            currentPage={page}
            onClickCallback={handlePageChange}
            totalPages={totalPages}
            
          />
    </div>
    </div>
    
    
    </>
  );
}
