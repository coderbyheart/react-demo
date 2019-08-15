import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";
import './Footer.css'
import {Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import './Footer.css'

const FooterPage = () => {
  return (
    <MDBFooter  className='footer' >
    <div className="footer-copyright text-center py-3">
      <MDBContainer fluid>
        &copy; {new Date().getFullYear()} Copyright:  wiedergruen 
        <Icon name='github' size='large'/>
        <Icon name='xing' size='large' />
        <Icon name='linkedin' size='large'/>
        <Icon name='calendar alternate' size='large'/>
        <Icon name='twitter' size='large'/>
        <Icon name='skype' size='large'/>
        <Icon name='phone' size='large'/>
        <Icon name='mail' size='large'/>
      </MDBContainer>
    </div>
  </MDBFooter>
  );
}

export default FooterPage;