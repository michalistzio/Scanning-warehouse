import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Container, Row, Col, Button} from 'react-bootstrap';

const Scanned = () => {
    const [packages, setPackages] = useState([]);
    const fetchData = async () => {
        try {
          
          const response = await fetch( "http://localhost:8080/packages?status=scanned");
          const jsonData = await response.json();
          setPackages(jsonData.packages);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    useEffect(() => {
        fetchData();
    },[]);

    return(
        <div>
            <div className="container text-center p-3 py-5">
                <Table striped hover>
                    <thead>
                        <tr>
                            <th><b>Driver</b></th>
                            <th><b>Voucher</b></th>
                            <th><b>Postcode</b></th>
                            <th><b>Status</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map((item, index) => (
                            <tr key={index}>
                                <td >{item.driver}</td>
                                <td>{item.voucher}</td>
                                <td>{item.postcode}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Container>
                <Row className="py-5 d-flex justify-content-center">
                    <Col sm={4} className="text-center">
                        <Button variant="primary">
                        <Link to={'/'} style={{ color: 'white' }}>All Packages</Link>
                            </Button>
                    </Col>
                </Row>
            </Container>



        </div>
       
         
    );
}

export default Scanned;