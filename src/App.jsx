import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Card,Row,Col, Container, FormGroup} from 'react-bootstrap'
import './App.css'

function App() {
  const [dato,setDato]=useState([]);
  const [fecha,setFecha]=useState('');
  const [descripcion,setDescripcion]=useState('');
  const [prioridad,setPrioridad]=useState(false);
  const [editIndex,setEditIndex]=useState(null);
  
  const handleSubmit=(event)=>{
  event.preventDefault();

  if(editIndex !== null){
    const newDato=[...dato];
    newDato[editIndex]={fecha, descripcion, prioridad}
    setDato(newDato)
    setEditIndex(null)

  } else {
      setDato([...dato,{fecha,descripcion, prioridad}])
  }
   setFecha('')
   setDescripcion('')
   setPrioridad(false)
  }

  const handleDelete=(index)=>{
    const newDato=[...dato];
    newDato.splice(index,1);
    setDato(newDato);
  }

  const handleEdit=(index)=>{
    setFecha(dato[index].fecha);
    setDescripcion(dato[index].descripcion);
    setPrioridad(dato[index].prioridad)
    setEditIndex(index);
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
          <Form onSubmit={handleSubmit}> 
            <Form.Group className="mb-3">
                <Form.Label>Fecha</Form.Label>
                <Form.Control type="text" placeholder="Ingrese Fecha" value={fecha} onChange={(e)=>setFecha(e.target.value)}  />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control type="text" placeholder="Ingrese Descripcion" value={descripcion} onChange={(e)=>setDescripcion(e.target.value)}/>
            </Form.Group>
            <FormGroup>
              <Form.Check
                type='checkbox'
                checked = {prioridad}
                onChange={(e) => setPrioridad(e.target.checked)}
                label='Tarea prioritaria'
                id='Check'
              />
            </FormGroup>
            
              
              <Button type="submit">
                {
                  editIndex!==null? 'Actualizar Datos': 'Agregar Datos'
                }
              </Button>


            </Form>
          </Col>
        </Row>
        <Row>
          {
            dato.map((student,index)=>(
            <Col sm={6} key={index}>
                  <Card style={{ width:'18rem',marginTop:'20px'}}>
                
                      <Card.Body>
                        <Card.Title>Prioridad tareas</Card.Title>
                        <Card.Text>Fecha: {student.fecha}</Card.Text>
                        <Card.Text>Descripcion: {student.descripcion}</Card.Text>
                        <Card.Text>Prioridad: {student.prioridad ? 'Importante': ''}</Card.Text>
                        <Button variant="danger" onClick={() => handleDelete(index)}>
                          Eliminar
                        </Button>
                      <Button variant="warning" onClick={() => handleEdit(index)} style={{ marginLeft: '10px' }}>
                          Editar
                      </Button>
                      </Card.Body>
                  </Card>
            </Col>
            ))
          }
        </Row>
            
        </Container>
              
      
    </>
  )
}

export default App
