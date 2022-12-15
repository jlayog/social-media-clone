import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, GoogleLogout } from '@react-oauth/google';
import { useNavigate } from'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import loginVideo from '../assets/phoneScroll.mp4';
import logo from '../assets/justYou-3.png';


const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    // Set to localStorage
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    // Create new sanity document in the database for the user
    const { name, googleId, imageUrl } = response.profileObj;
    // Fields for document creation
    const doc = { 
      // underscore properties define which document sanity is creating
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    }
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video 
          src={loginVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} width="180px" alt="logo" />
          </div>
          <div className='shadow-2xl'>
            {/* 
              It is safe to have the Google Ouauth client key exposed as it does not grant access tokens,
              but allows phising scenarios. It will however still have to authorize the fake client in order for it to get a new access token.
              Detailed explanation: https://mailarchive.ietf.org/arch/msg/oauth/dRiobpjQcdIm95EFqNVfZidxgqc/              
            */}
            <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}`}>
              <GoogleLogin  
                render={(renderProps) => (
                  <button
                    type="button"
                    className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className="mr-4" /> Sign in with Google
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy='single_host_origin'
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login