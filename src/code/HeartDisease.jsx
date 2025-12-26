import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";

export default function HeartDisease() {

    const [position, setPosition] = useState({ x: 100, y: 100 });
const [dragging, setDragging] = useState(false);
const [offset, setOffset] = useState({ x: 0, y: 0 });

const handleMouseDown = (e) => {
  setDragging(true);
  setOffset({
    x: e.clientX - position.x,
    y: e.clientY - position.y
  });
};

const handleMouseMove = (e) => {
  if (!dragging) return;
  setPosition({
    x: e.clientX - offset.x,   // ✅ normal horizontal motion
    y: e.clientY - offset.y    // ✅ normal vertical motion
  });
};

const handleMouseUp = () => {
  setDragging(false);
};

  const[age,setAge] = useState('')
  const[sex,setSex] = useState('')
  const[chest_pain,setChest_pain] = useState('')
  const[bp,setBp] = useState('')
  const[cholesterol,setCholesterol] = useState('')
  const[result,setResult] = useState(null)
 

  const handelSubmit = async (e) =>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('age',age)
    formData.append('sex',sex)
    formData.append('chest_pain',chest_pain)
    formData.append('bp',bp)
    formData.append('cholesterol',cholesterol)
    try{
        const res = await axios.post("http://127.0.0.1:8000/api/disese/",formData,{
            headers:{"Content-Type": "multipart/form-data"}}
        )
        console.log("Prediction result:", res.data.prediction)
        setResult(res.data.prediction)

    }catch (error) {
        console.log(error)
    }

  }

 
  

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ height: "100vh" }}
    >
      <div
        onMouseDown={handleMouseDown}
        style={{
          width: "400px",
          padding: "20px",
          backgroundColor: result === "Yes" ? "#B32222" : result === "No" ? "#09f67fff" : "#4BD2B3",
          border: "2px solid #333",
          borderRadius: "8px",
          cursor: "grab",
          position: "absolute",
          left: position.x,
          top: position.y
        }}
      >
        <h3>Heart Disease Prediction Preadiction</h3>
        <Form onSubmit={handelSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" placeholder="Enter Age" value={age} onChange={(e)=>setAge(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select value={sex} onChange={(e)=>setSex(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="0">Male</option>
              <option value="1">Female</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Chest Pain</Form.Label>
            <Form.Select value={chest_pain} onChange={(e)=>setChest_pain(e.target.value)}>
              <option value="">Select Gender</option>
              <option >0</option>
              <option >1</option>
              <option >2</option>
              <option >3</option>
              <option >4</option>
            </Form.Select>
          </Form.Group>
         
          <Form.Group className="mb-3">
            <Form.Label>Blood Pressure</Form.Label>
            <Form.Control type="number" placeholder="Enter BP" value={bp} onChange={(e)=>setBp(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cholesterol</Form.Label>
            <Form.Control type="number" placeholder="Enter cholesterol" value={cholesterol} onChange={(e)=>setCholesterol(e.target.value)} />
          </Form.Group>


          <Button variant="primary" type="submit">
            Submit
          </Button>
{result && (
  <h2>Heart Disease Prediction   {result}</h2>
)}

        </Form>
      </div>
    </div>
  );
}
