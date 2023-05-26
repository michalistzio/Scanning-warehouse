import React from 'react';
import { useEffect, useState } from 'react';
import { Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { InputGroup, FormControl, Button, Row, Col, Container, Form } from 'react-bootstrap';


const Packages = () => {

    const [packages, setPackages] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [inputVoucher, setInputVoucher] = useState('');
    const [error, setError] = useState();
    const [isPending, setIsPending] = useState(false);

    const fetchData = async () => {
        try {
          
          const response = await fetch(isPending? "http://localhost:8080/packages?status=pending" :  "http://localhost:8080/packages");
          const jsonData = await response.json();
          setPackages(jsonData.packages);
          setDrivers(jsonData.readyDrivers);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    useEffect(() => {
        fetchData();
    },[isPending]);

    const pendingPackages = () => {
        const change = !isPending
        setIsPending(change);
        fetchData();
    }

    const scanItem = () => 
    {
        let reqBody = {
            voucher: inputVoucher
        };
        fetch('http://localhost:8080/scan', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
          })
            .then(result => {
            if (!result.ok) {
                throw new Error();
            }
              fetchData();
              setError('')
            })
            .catch(error => {
                console.log(error);
              setError(`An error occurred. Please try again`);
            });
    }

    const resetDb = () => 
    {
        fetch('http://localhost:8080/reset', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          }).then(result => {
            fetchData();
          })
    }

    return (
        <div>
            <div className="row py-5">
                <div className="col-sm-8 ps-5">
                    <h3>Welcome to SLM Warehouse</h3>
                </div>
                <div className="col-sm-4 pe-5">
                    <InputGroup>
                        <FormControl value={inputVoucher} 
                            onChange={(e) => setInputVoucher(e.target.value) } 
                            onKeyDown={(e) => {if (e.key === 'Enter') {scanItem();}}} 
                            placeholder="Scan package here" />
                        <Button onClick={scanItem} variant="primary">Scan</Button>
                        
                    </InputGroup>
                    {error && <small className="text-danger">{error}</small>}
                </div>
            </div>
            <div className="container text-center p-3">
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

                <Table striped hover className='mt-5'>
                    <thead>
                        <tr>
                            <th><b>Ready Drivers</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((item, index) => (
                            <tr key={index}>
                                <td > <b>{item.name}</b></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div> 
            <Container>
                <Row className="py-5">
                    <Col sm={4}>
                        <Button onClick={resetDb} variant="danger">Reset</Button>
                    </Col>
                    <Col sm={4} className="text-center">
                        <Button onClick = {pendingPackages} variant="primary">Pending or All</Button>
                    </Col>
                    <Col sm={4} className="text-end">
                        <Button variant="primary">
                            <Link to={'/scanned'} style={{ color: 'white' }}>Scanned</Link>
                        </Button>
                    </Col>
                </Row>
            </Container>
            
        </div>

    );
};

export default Packages;
