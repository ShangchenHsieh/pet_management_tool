import React from 'react';
import Navbar from './Navbar';
import '../componentStylins/QA.css';

const Singup = () => {
  return (
    <>
      <Navbar />
      <div className="About-container">
        <div class="login">
          <div class="container">
              <div class="row">
                  <div class="col-md-8 m-auto">
                      <h1 class="display-4 text-center">Signup</h1>
                      <form action="">
                        <div class="form-group">
                          <input type="first_name" class="form-control form-control-lg" placeholder="first name" name="first_name" />
                        </div>
                        <div class="form-group">
                          <input type="last_name" class="form-control form-control-lg" placeholder="last name" name="last_name" />
                        </div>
                        <div class="form-group">
                          <input type="phone" class="form-control form-control-lg" placeholder="phone" name="phone" />
                        </div>
                        <div class="form-group">
                          <input type="username" class="form-control form-control-lg" placeholder="username" name="username" />
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

export default Singup;