import React, { Component } from 'react';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import * as actions from 'Actions';
import Alert from 'Alert';

class Signup extends Component {
  
  componentWillMount() {
    this.props.removeErroMessage();
  }

  handleFormSubmit({username, email, password}){
    this.props.signupUser({username, email, password});    
  }
  
  render() {
    var {handleSubmit, fields:{username, email, password, passwordConfirm}} = this.props;   
    
    return (
      <div className="row">
        <h1 className="text-center">Create a New Account</h1>
        <div className="col-md-3"></div>
        <div className="col-md-6">    
          <Alert />
          <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
            <div className="form-group">
              <label htmlFor="username">Username:</label>             
              <input 
                id="username"
                className="form-control" placeholder="Username" 
                {...username}
              />
              {(username.error&&username.touched)&&<div className='text-danger'>{username.error}</div>}
            </div>            
            <div className="form-group">
              <label htmlFor="email">Email:</label>             
              <input 
                id="email"
                className="form-control" placeholder="Email" 
                {...email}
              />
              {(email.error&&email.touched)&&<div className='text-danger'>{email.error}</div>}
            </div>           
            <div className="form-group">
              <label htmlFor="password">Password:</label>             
              <input 
                id="password"
                className="form-control" type="password" 
                {...password}
              />
              {(password.error&&password.touched)&&<div className='text-danger'>{password.error}</div>}
            </div>           
            <div className="form-group">
              <label htmlFor="passwordConfirm">Confirm Password:</label>             
              <input 
                id="passwordConfirm"
                className="form-control" type="password" 
                {...passwordConfirm}
              />
              {(passwordConfirm.error&&passwordConfirm.touched)&&<div className='text-danger'>{passwordConfirm.error}</div>}
            </div>           
            <button type="submit" className="btn btn-success">Save</button>           
            <Link to="/" className="btn btn-default">Cancel</Link>      
          </form>
        </div>
        <div className="col-md-3"></div>
      </div>      
    );
  }
}

//simple email validator
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

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