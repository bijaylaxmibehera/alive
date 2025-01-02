import React from 'react';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../features/auth/authSlice'; 
import { GoogleLogin } from '@react-oauth/google';  
import { useNavigate } from 'react-router';

const GoogleAuthButton = ({ role, organization }) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleGoogleLogin =async (response) => {
    const token = response.credential; 
    try{
     await dispatch(googleLogin({ token, role,organization})); 
     navigate('/');
    }catch(error){
      console.error('Google login failed', error);
    }
    
   
  };

  const handleFailure = (error) => {
    console.error('Google login failed', error);
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}   
      onError={handleFailure}         
      useOneTap                       
    />
  );
};

export default GoogleAuthButton;
