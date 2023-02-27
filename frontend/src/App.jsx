import { useEffect, useState } from "react"
import {Button, ButtonGroup, FloatingLabel, Form, Table} from "react-bootstrap"

export default function App() {
  const [data, setData ] = useState([])
  const [input ,setInput] = useState({
    nama_pekerjaan : "",
    lokasi : "",
    rating : "",
  })
  const [selected, setSelected] = useState(-1)
  async function getData() {
    try {
      const res =await fetch("/api")
      if(!res.ok) return 
      setData(await res.json())
    }catch(err) {
      console.log(err)
    }
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    try {
      const isEdit = selected >= 0
        const res = await fetch(isEdit ? "/api/"+selected: "/api", {
          method: isEdit ?"PUT" :  "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        })

        if(!res.ok) return 
       getData()
        setInput({
          nama_pekerjaan : "",
          lokasi : "",
          rating : "",
        })
        setSelected(-1)
    }catch(err) {
      console.log(err)
    }
  }
  
  async function hapusData(id) {
    try {
      const res = await fetch("/api/"+id, {
        method: "DELETE",
      })
      if(!res.ok) return 
      getData()
    }catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  
  return(
    <>
    <form style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center",flexDirection:"column"}} onSubmit={handleSubmit}>
      <FloatingLabel controlId="nama_pekerjaan" label="Nama Pekerjaan" style={{width:"90%"}}>
        <Form.Control type="text" placeholder="Masukkan nama Pekerjaan" value={input.nama_pekerjaan} onChange={e => setInput({...input, nama_pekerjaan: e.target.value})} />
      </FloatingLabel>
     
    <FloatingLabel controlId="lokasi" label="Lokasi" style={{width:"90%"}}>
        
        <Form.Control  value={input.lokasi} onChange={e => setInput({...input, lokasi: e.target.value})} type="text" placeholder="Lokasi"   />

      </FloatingLabel>
     
    <FloatingLabel controlId="rating" label="Rating" style={{width:"90%"}}>

        <Form.Control  value={input.rating} onChange={e => setInput({...input, rating: parseFloat(e.target.value)})} step="0.1" min="0.1" max="5" type="number" placeholder="Rating"   />

      </FloatingLabel>
        <Button  type="submit"> {selected >= 0 ? "Edit" : "Submit"} </Button>
    </form>
    <Table striped bordered hover>
      <thead>
        <th>NO</th>
        <th>Nama Pekerjaan</th>
        <th>Lokasi</th>
        <th>Rating</th>
        <th>Aksi</th>
      </thead>
      <tbody>
        {
          data.map((el,ind) => (
            <tr key={el.id}>
              <td>{ind+1}</td>
              <td>{el.nama_pekerjaan}</td>
              <td>{el.lokasi}</td>
              <td>{el.rating}</td>
              <td>
                <ButtonGroup>
                  <Button variant="danger" onClick={() => {
                    hapusData(el.id)
                  }}>Hapus</Button>
                  <Button variant="secondary" onClick={() => {
                    setSelected(el.id)
                    setInput(el)
                  }}>Edit</Button>
                </ButtonGroup>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
    
    </>
  )
}