import React from "react";

import img1 from '../../../assets/images/users/1.jpg';
import img2 from '../../../assets/images/users/2.jpg';
import img3 from '../../../assets/images/users/3.jpg';
import img4 from '../../../assets/images/users/4.jpg';
import contrattoIMG from '../../../assets/images/lista-utenti/CONTRATTO.png';
import contrattoAsset from '../../../assets/images/lista-utenti/contrattoAsset.png';
import userDelete from '../../../assets/images/lista-utenti/delete.png';
import userEdit from '../../../assets/images/lista-utenti/pencil.png';
import Checkbox from '@material-ui/core/Checkbox';


import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Input,
    Table
} from 'reactstrap';

const Projects = () => {
    return (
        /*--------------------------------------------------------------------------------*/
        /* Used In Dashboard-4 [General]                                                  */
        /*--------------------------------------------------------------------------------*/

        <Card>
            <CardBody>
                <div className="d-flex align-items-center">
                    <div style={{display:"flex",flexDirection:'row'}}>
                        <CardTitle  style={{color:'#0ac92d',marginRight:15,cursor:'pointer',fontWeight:'bold'}}>Lista Utenti</CardTitle>
                        <CardTitle style={{cursor:'pointer',fontWeight:'bold'}}>Nuovo Utente</CardTitle>
                        {/*<CardSubtitle>Overview of Latest Month</CardSubtitle>*/}
                    </div>
                    <div className="ml-auto d-flex no-block align-items-center">
                        <div className="dl">
                            <Input type="select" className="custom-select">
                                <option value="0">Monthly</option>
                                <option value="1">Daily</option>
                                <option value="2">Weekly</option>
                                <option value="3">Yearly</option>
                            </Input>
                        </div>
                    </div>
                </div>
                <Table className="no-wrap v-middle" responsive>
                    <thead>
                        <tr className="border-0">
                            <th style={{paddingLeft:65}}className="border-0">Nome - Cognome</th>
                            <th className="border-0">Tipologia</th>

                            <th className="border-0">Società</th>
                            <th className="border-0"></th>

                            <th className="border-0"></th>
                            <th className="border-0"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="d-flex no-block align-items-center">
                                    <Checkbox
                                        style={{paddingRight:15}}
                                        name="checkedB"
                                        color="primary"
                                    />  
                                    <div>
                                        <h5 className="mb-0 font-16 font-medium">Mauro Marchioni</h5><span>info@mirtom.it</span>
                                    </div>
                                </div>
                            </td>
                            <td>Account Master</td>

                            <td>
                                ITALPROM SRL

                            </td>
                            <td style={{fontWeight:'bold'}}>Responsabile Tecnico</td>
                            <td>
                                <div style={{justifyContent:"space-evenly", display: "flex"}}>
                                    <img className="list-user" style={{paddingRight: 5}} src={contrattoIMG} width="24"/>
                                    <img className="list-user" style={{paddingRight: 5}} src={contrattoAsset} width="24"/>
                                </div>
                            </td>
                            <td>
                                <div style={{justifyContent:"space-evenly", display: "flex"}}>
                                    <img className="list-user" style={{paddingRight: 5}} src={userEdit} width="24"/>
                                    <img className="list-user" style={{paddingRight: 5}} src={userDelete} width="24"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex no-block align-items-center">
                                    <Checkbox
                                        style={{paddingRight:15}}
                                        name="checkedB"
                                        color="primary"
                                    />  
                                    <div>
                                        <h5 className="mb-0 font-16 font-medium">Mauro Marchioni</h5><span>info@mirtom.it</span>
                                    </div>
                                </div>
                            </td>
                            <td>Account Master</td>

                            <td>
                                ITALPROM SRL

                            </td>
                            <td style={{fontWeight:'bold'}}>Responsabile Tecnico</td>
                            <td>
                                <div style={{justifyContent:"space-evenly", display: "flex"}}>
                                    <img className="list-user" style={{paddingRight: 5}} src={contrattoIMG} width="24"/>
                                    <img className="list-user" style={{paddingRight: 5}} src={contrattoAsset} width="24"/>
                                </div>
                            </td>
                            <td>
                                <div style={{justifyContent:"space-evenly", display: "flex"}}>
                                    <img className="list-user" style={{paddingRight: 5}} src={userEdit} width="24"/>
                                    <img className="list-user" style={{paddingRight: 5}} src={userDelete} width="24"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex no-block align-items-center">
                                    <Checkbox
                                        style={{paddingRight:15}}
                                        name="checkedB"
                                        color="primary"
                                    />  
                                    <div>
                                        <h5 className="mb-0 font-16 font-medium">Mauro Marchioni</h5><span>info@mirtom.it</span>
                                    </div>
                                </div>
                            </td>
                            <td>Account Master</td>

                            <td>
                                ITALPROM SRL

                            </td>
                            <td style={{fontWeight:'bold'}}>Responsabile Tecnico</td>
                            <td>
                                <div style={{justifyContent:"space-evenly", display: "flex"}}>
                                    <img className="list-user" style={{paddingRight: 5}} src={contrattoIMG} width="24"/>
                                    <img className="list-user" style={{paddingRight: 5}} src={contrattoAsset} width="24"/>
                                </div>
                            </td>
                            <td>
                                <div style={{justifyContent:"space-evenly", display: "flex"}}>
                                    <img className="list-user" style={{paddingRight: 5}} src={userEdit} width="24"/>
                                    <img className="list-user" style={{paddingRight: 5}} src={userDelete} width="24"/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card >
    );
}

export default Projects;
