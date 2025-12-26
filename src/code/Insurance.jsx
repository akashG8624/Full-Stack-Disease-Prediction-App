import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";

export default function Insurance() {

  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const[age,setAge] = useState('')
  const[sex,setSex] = useState('')
  const[bmi,setBmi] = useState('')
  const[smoker,setSmoker] = useState('')
  const[result,setResult] = useState(null)
 

  const handelSubmit = async (e) =>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('age',age)
    formData.append('sex',sex)
    formData.append('bmi',bmi)
    formData.append('smoker',smoker)
    try{
        const res = await axios.post("http://127.0.0.1:8000/api/predict/",formData,{
            headers:{"Content-Type": "multipart/form-data"}}
        )
        console.log("Prediction result:", res.data.predicted_medical_cost)
        setResult(res.data.predicted_medical_cost)

    }catch (error) {
        console.log(error)
    }

  }

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
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

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
          backgroundColor: "#4BD2B3",
          border: "2px solid #333",
          borderRadius: "8px",
          cursor: "grab",
          position: "absolute",
          left: position.x,
          top: position.y
        }}
      >
        <h3>Insurance Price Preadiction</h3>
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
            <Form.Label>Body Mass Index</Form.Label>
            <Form.Control type="number" placeholder="Enter BMI" value={bmi} onChange={(e)=>setBmi(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Smoker</Form.Label>
            <Form.Select value={smoker} onChange={(e)=>setSmoker(e.target.value)}>
              <option value="">Select Option</option>
              <option value="0">Not Smoking</option>
              <option value="1">Smoking</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
{result && (
  <h2>Predicted Insurance Cost /n ₹ {result}</h2>
)}

        </Form>
      </div>
    </div>
  );
}
