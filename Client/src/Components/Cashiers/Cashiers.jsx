import React,{useState,useEffect} from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Popup from 'reactjs-popup';
import './Cashiers.css';

const columns = (DeleteById , UpdateById , GetById) => [
    {
        name: 'Id',
        selector:row=>row._id,
        sortable: true
    },
    {
        name: 'Full Name',
        width: '180px',
        selector:row=>row.full_name,
        sortable: true
    },
    {
        name: 'Password',
        width: '180px',
        selector:row=>row.password,
        sortable: true
    },
    {
        name: 'Delete',
        width: '200px',
        cell: row => (
            <>
                <Button variant="outlined" startIcon={<DeleteIcon /> } onClick={()=>DeleteById(row._id)}>Delete Cashier</Button>
            </>    
        )
    },
    {
        name: 'Update',
        width: '200px',
        cell: row => (
            <>
                <Button variant="outlined" startIcon={<DeleteIcon /> } onClick={()=>UpdateById(row)}>
                    Update
                </Button>
            </>    
        )
    },
    {
        name: 'Get Info',
        width: '200px',
        cell: row => (
            <>
                <Button variant="outlined" startIcon={<DeleteIcon /> } onClick={()=>GetById(row)}>
                    Get id
                </Button>
            </>    
        )
    }
]

const customStyles = {
    headCells:{
      style:{
        backgroundColor: "black",
        color: "white",
        fontSize: "17px",
        fontWeight: "bold"
      }
    }
} 

const Cashier = ()=>{
    const [cashier,setCashiers] = useState([]);
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null); 
    const [filterFullname, setFilterFullname] = useState("");
    const [idsetFullname, setIdSetFullname] = useState("");
    const [openup, setOpenUp] = useState(false);


    useEffect(()=>{
        fetchHEY();
    },[filterFullname]);

    // const Cashiers = async ()=>{
    //     const response = await axios.get("http://localhost:1000/cashier",{
    //         params:{
    //             fullname: filterFullname,
    //             password: password
    //         }
    //     });
    //     console.log("RRRR",response.data.cashier);
    //     setCashiers(response.cashier);
    // };

 
    const GetById=(cashier)=>{
        setIdSetFullname(cashier.full_name);
        setOpenUp(true);  
        console.log("Name -",cashier.full_name);
    };

    const postData = async (e)=>{
        e.preventDefault();
        const url = "http://localhost:1000/cashier";
        const data = {
            full_name: fullname,
            password: password
        };

        try{
            const response = await axios.post(url,data);
          
        }
        catch(error){
            console.error("ERROR", error);
        }
        // Cashiers();
    };

    const DeleteById = async (id)=>{
        console.log("Delete called with ID:", id); // Add this line
        if(confirm("Are you sure?")){
            const url = `http://localhost:1000/cashier/${id}`;
            try{
                await axios.delete(url);
                fetchCashiers();
                // Cashiers();
            }
            catch(error){
                console.error("ERROR", error);
            }
        }
     
    };

    const fetchHEY = async ()=>{
        const response = await axios.get("http://localhost:1000/cashier", {
            params: {
                fullname: filterFullname
            }
        });
        setCashiers(response.data.cashier);
    }
    // const fetchCashiers = async ()=>{
    //     const response = await axios.get("http://localhost:1000/cashier", {
    //         params: {
    //             fullname: filterFullname
    //         }
    //     });
    //     setCashiers(response.data.cashier);
    // }

    const UpdateById = async (rowData)=>{
        setEditId(rowData._id);
        setFullname(rowData.full_name);
        setPassword(rowData.password);
        setOpen(true);
    };
    
   const handleUpdate = async ()=>{
    console.log("Full - ",fullname);

    if(editId){
        const url = `http://localhost:1000/cashier/${editId}`;
        const data = {
            full_name: fullname,
            password:  password
        };

        try{
            await axios.put(url,data);
            Cashiers();
            setOpen(false);
            setFullname("");
            setEditId(null);
        }
        catch(error){
            console.error("ERROR", error);
        }
    }
};
   
    return(
        <div className="client">
            <h1>Cashier</h1>
            <div className="filter">
                <form action="" onSubmit={postData} className="form-submit">
                        <div>
                            <label htmlFor="fullname">Full Name : </label>
                            <input id ='fullname' className="fullname" type="text" value={fullname} onChange={(e)=>setFullname(e.target.value)} />
                            <label htmlFor="password">Password : </label>
                            <input id = 'password' className="fullname" type="text" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                        <div>
                            <button className="btn-submit" type="submit">Add Client</button>
                        </div>
                </form>
                <div>
                    <label>Filter by Full Name : </label>
                    <input className="fullname" type="text" value={filterFullname} onChange={(e) => setFilterFullname(e.target.value)} />
                </div>
            </div>

             <DataTable columns={columns(DeleteById, UpdateById, GetById)} 
             data = {cashier} 
             customStyles = {customStyles} 
             pagination  />
             <Popup open = {open} onClose ={()=> setOpen(false)} model nested>
                    <div className="update">
                            <h2>Update Info...</h2>
                            <label htmlFor="">Full Name</label><input type="text" onChange={(e)=>setFullname(e.target.value)} />
                            <label htmlFor="">Password</label><input type="text" onChange={(e)=>setPassword(e.target.value)} />
                            <button onClick={handleUpdate}>Click to update</button>
                    </div>
              </Popup>
            
                <Popup className="pop-up" open = {openup} onClose ={()=> setOpenUp(false)} model nested>
                        <div className="display">
                                <h2>Display....</h2>
                                <h2>Name - {idsetFullname}</h2>
                                <h2>Password - {password}</h2>
                        </div>
                </Popup>
        </div>
    );
}

export default Cashier;