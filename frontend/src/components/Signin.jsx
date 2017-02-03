import React, { Component } from 'react';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';

import {removeErroMessage, signinUser} from 'Actions';
import Alert from 'Alert';


class Signin extends Component {
  
  componentWillMount() {
    this.props.removeErroMessage();    
  }

  handleFormSubmit({login, password}){
    this.props.signinUser({login, password});    
  }

  render() {
    var {handleSubmit, fields:{login, password}} = this.props;    
    return (
      <div className="row auth-wrapper">
        <h1 className="text-center">Sign In</h1>
        <div className="col-sm-3 col-xs-2"></div>
        <div className='col-sm-6 col-xs-8'>
          <div className='row auth'>  
            <Alert />
            <div className="col-md-6 auth-form-wrapper">    
              <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
                <div className="form-group">              
                  <input 
                    id="login"
                    className="form-control" placeholder="Email or Username" 
                    {...login}
                  />
                  {(login.error&&login.touched)&&<div className='text-danger'>{login.error}</div>}  
                </div>                        
                <div className="form-group">              
                  <input 
                    id="password"
                    className="form-control" type="password" 
                    placeholder='Password'
                    {...password}
                  />
                  {(password.error&&password.touched)&&<div className='text-danger'>{password.error}</div>}
                </div>                       
                <button type="submit" className="btn btn-custom-danger btn-block">Submit</button>                           
              </form>
            </div>
            <div className="col-md-6 social-wrapper">
              <div>
                <button className='btn btn-default btn-block'>
                  <i className="fa fa-facebook facebook social-icon" aria-hidden="true"></i>
                  Sign in with Facebook
                </button>
              </div>
                <button className='btn btn-default btn-block'>
                  <i className="fa fa-twitter twitter social-icon" aria-hidden="true"></i>
                  Sign in with Twitter
                </button>
              <div>
              </div>
            </div>             
           </div> 
           <div>
              Need an account? <Link to='signup'>Sign Up »</Link>                         
            </div>           
        </div>
        <div className="col-sm-3 col-xs-2"></div>
      </div>            
    );
  }
}

function validate(fromProps){  
  var errors = {}; 

  if(!fromProps.login){
    errors.login = 'Please enter a username or an email';
  }

  if(!fromProps.password){
    errors.password = 'Please enter a password';
  }

  return errors;
}

export default reduxForm({
  form: 'signin',
  fields: ['login', 'password'],
  validate
}, null, {removeErroMessage, signinUser})(Signin);