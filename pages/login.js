import React from 'react'

const Login = () => (
  <form action="admin/menu" method="GET" className="form-group">
    <label htmlFor="password">Hasło:</label> 
    <input name="password" className="form-control" type="password" id="password" required autoFocus></input>
    <button type="submit" class="btn">Zaloguj</button>
  </form>
);

export default Login;