import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Container } from "react-bootstrap";
import Utils from "../utils/Utils";
const Profile = () => {
const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>

      <div className='image-header'>
        <div className='avatar'>
          <img src={user.picture} alt="Profile"/>
        </div>
        <div className='info'>
          <h1>{user.name}</h1>
        </div>
      </div>

      <Container>
        <div className='content'>
          <div className='side-content card'>
            <ul>
              <li>
                <h3>Nickname:</h3>
                {user.nickname}
              </li>
              <li>
                <h3>Updated at:</h3>
                {Utils.convertDateAMDT(user.updated_at)}<br/>
              </li>
              <li>
                <h3>Email:</h3>
                {user.email}
              </li>
              <li>
                <h3>Email verified:</h3>
                {user.email_verified?"❌ Please validate your email":"✅ Email verified"}
              </li>
            </ul>
          </div>
          
          <div className='comments-content'>
            
            <div className='comments card'>
              <h2 className='name'>About me</h2>
              <div className='text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Mauris placerat nisl at mauris placerat, vitae finibus risus dapibus.
              Nulla blandit ipsum et libero condimentum, ut sollicitudin velit viverra.
              Vestibulum mi velit, consequat vitae ex ac, maximus vestibulum lacus.
              Praesent condimentum mauris ultrices lacus laoreet, consectetur volutpat sem sagittis.
              Donec sit amet lacinia mi, vitae lacinia augue.
              </div>
            </div>

            <div className='comments card'>
              <h2 className='name'>Socials</h2>
              <div className="socials-wrap">
                <div className="socials-wrap-inner">
                <div className="iva-socials">
                    <ul className="at-socials icon-style-8">
                      <li className="twitter"><a href="https://twitter.com/"><i className="fa fa-twitter"><span></span></i></a></li>
                      <li className="linkedin"><a href="https://www.linkedin.com/"><i className="fa fa-linkedin"><span></span></i></a></li>
                      <li className="facebook"><a href="https://www.facebook.com/"><i className="fa fa-facebook"><span></span></i></a></li>
                      <li className="google"><a href="https://www.google.co.in"><i className="fa fa-google"><span></span></i></a></li>
                      <li className="instagram"><a href="https://www.instagram.com/"><i className="fa fa-instagram"><span></span></i></a></li>
                      <li className="whatsapp"><a href="https://www.instagram.com/"><i className="fa fa-whatsapp"><span></span></i></a></li>
                    </ul>
                  </div>
                </div>
            </div>

            </div>

          </div>
        </div>

      </Container>
    </Fragment>
  );
};

export default Profile;