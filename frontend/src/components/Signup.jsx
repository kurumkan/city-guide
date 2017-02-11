import React, { Component } from 'react';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';

import * as actions from 'actions/Actions';
import Alert from 'components/Alert';


export class Signup extends Component {
  
  componentWillMount() {
    this.props.removeErroMessage();
  }

  handleFormSubmit({username, email, password}){  	
    this.props.signupUser({username, email, password});    
  }

  
  render() {
    var {handleSubmit, fields:{username, email, password, passwordConfirm}} = this.props;   
    
    return (
      <div className="row auth-wrapper">
        <h1 className="text-center">Sign Up</h1>
        <div className="col-md-3 col-sm-2"></div>
        <div className='col-md-6 col-sm-8'>
          <div className='row auth'>
            <Alert/>
            <div className="col-md-6 auth-form-wrapper">    
              <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
                <div className="form-group">                  
                  <input 
                    id="username"
                    className="form-control" placeholder="Username" 
                    {...username}
                  />
                  {(username.error&&username.touched)&&<div className='text-danger'>{username.error}</div>}
                </div>            
                <div className="form-group">                  
                  <input 
                    id="email"
                    className="form-control" placeholder="Email" 
                    {...email}
                  />
                  {(email.error&&email.touched)&&<div className='text-danger'>{email.error}</div>}
                </div>           
                <div className="form-group">                  
                  <input 
                    id="password"
                    className="form-control" type="password" placeholder='Password'
                    {...password}
                  />
                  {(password.error&&password.touched)&&<div className='text-danger'>{password.error}</div>}
                </div>           
                <div className="form-group">                  
                  <input 
                    id="passwordConfirm"
                    className="form-control" type="password" placeholder='Password Confirm'
                    {...passwordConfirm}
                  />
                  {(passwordConfirm.error&&passwordConfirm.touched)&&<div className='text-danger'>{passwordConfirm.error}</div>}
                </div>           
                <button type="submit" className="btn btn-custom-danger btn-block">Sign up</button>                       
              </form>
            </div>
            <div className="col-md-6 social-wrapper">
              <div>          
            	<a href='/auth/facebook' className='btn btn-default btn-block'>
	                <i className="fa fa-facebook facebook" aria-hidden="true"></i>
	                Sign up with Facebook
              	</a>              
              </div>
              <a href='/auth/vk' className='btn btn-default btn-block'>
	            <i className="fa fa-vk vk" aria-hidden="true"></i>
	            Sign up with Vk.com
              </a>
            </div>           
          </div> 
            <div>
              Already have an account? <Link to='signin'>Sign in »</Link>                         
            </div>           
         </div> 
        <div className="col-md-3 col-sm-2"></div>
      </div>      
    );
  }
}

//simple email validator
function validateEmail (email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};



function validate(fromProps){  
  var errors = {}; 

  if(!fromProps.username){
    errors.username = 'Please enter an username';
  }

  if(!fromProps.email){
    errors.email = 'Please enter an email';
  }

  if(!validateEmail(fromProps.email)){
    errors.email = "It doesn't look like a valid email";    
  }

  if(!fromProps.password){
    errors.password = 'Please enter a password';
  }

  if(!fromProps.passwordConfirm){
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if(fromProps.password!==fromProps.passwordConfirm){
    errors.password='Passwords must match!';
  } 

  return errors;
}


export default reduxForm({
  form: 'signup',
  fields: ['username', 'email', 'password', 'passwordConfirm'],
  validate
}, null, actions)(Signup);