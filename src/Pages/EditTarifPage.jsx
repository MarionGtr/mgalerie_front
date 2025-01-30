import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { useEffect, useState } from "react";
import TarifServices from "../Services/TarifServices";
import { Button, Container, Form, InputGroup, ListGroup } from "react-bootstrap";

const EditTarifPage = () => {
    const user = AuthService.getUser(); 

    // console.log(user);

    const {idTarif}=useParams();
    console.log(idTarif);
    const [updateTarif, setUpdateTarif] = useState({});
    console.log("page pour modifier les tarifs");

    const fetchDetailTarifById = async () =>{
        try {
            console.log("j'entre dans mon fetch");
            
            const response = await TarifServices.getTarifById(idTarif);
           console.log("j affiche mes reponses");
           console.log(response.data);
           
           setUpdateTarif(response.data[0]);
            
        } catch (error) {
            console.log(error);
            
        }
         }
    

 const handlechange = (event)=>{
    console.log(event.target.value);
    setUpdateTarif({...updateTarif, [event.target.name] : event.target.value});
    
 }

 const handleSubmit = async (e)=>{
  console.log("Tentative de soumission")
    e.preventDefault();
    try {
        const response = await TarifServices.updateTarifByID(idTarif, updateTarif)
        console.log("je suis dans mon try");

    } catch (error) {
        console.log(error);
        
    }
 }

    

useEffect(()=>{
    fetchDetailTarifById()
}, [idTarif]);

    return <>
    <Container>


    <Form onSubmit={handleSubmit}>
    <InputGroup className="mb-3">
        <Form.Control
          type="text"
          name="nom"
          value={updateTarif.nom}
          onChange={handlechange}
        />
        <Form.Control
          type="text"
          name="HEBERGEMENTS"
          value={updateTarif.HEBERGEMENTS}
        />
         <Form.Control
          type="text"
          name="prix"
          value={updateTarif.prix}
          onChange={handlechange}
        />
      <InputGroup.Text id="basic-addon2"> € par nuit</InputGroup.Text>
      <InputGroup.Text  id="basic-addon2">
       </InputGroup.Text>
       <Button type="submit" variant="primary" >
          Mettre à jour
        </Button>


      </InputGroup>

 





</Form>
        </Container>
    </>
}
 
export default EditTarifPage;