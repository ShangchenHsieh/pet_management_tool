import React from 'react';
import Navbar from './Navbar';
import '../componentStylins/QA.css';

const Login = () => {
  return (
    <>
      <Navbar />
      <div className="About-container">
        <div class="login">
          <div class="container">
              <div class="row">
                  <div class="col-md-8 m-auto">
                    
                      <form action="">
                          <div class="form-group">
                              <input type="email" class="form-control form-control-lg" placeholder="username" name="email" />
                          </div>
                          <div class="form-group">
                              <input type="password" class="form-control form-control-lg" placeholder="password" name="password" />
                          </div>
                          <input type="submit" class="btn btn-info btn-block mt-4" />
                      </form>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;