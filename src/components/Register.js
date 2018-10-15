import React from 'react';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RegisterName: '',
      RegisterEmail: '',
      RegisterPassword: ''
    }
  }

    onNameChange = (event) => {
      this.setState({RegisterName: event.target.value})
    }

    onEmailChange = (event) => {
      this.setState({RegisterEmail: event.target.value})
    }

    onPasswordChange = (event) => {
      this.setState({RegisterPassword: event.target.value})
    }

  onSubmitRegister = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.RegisterName,
        email: this.state.RegisterEmail,
        password: this.state.RegisterPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
        this.props.loadUser(user)
        this.props.onRouteChange('home');
        }
      })

  }


  render () {
    return (
      <main className="userForm mw6 center br3 pa3 pa4-ns mv3 bn grow shadow-3">
      <div className="measure center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="center f2 f4 fw6 ph0 mh0">Register</legend>
          <div className="mt3">
            <input 
            onChange={this.onNameChange}
            className="pa2 input-reset ba bg-transparent hover-bg-light-purple hover-white w-100 mt3" 
            type="text" 
            placeholder="name"  
            id="name" required/>

            <input 
            onChange={this.onEmailChange}
            className="pa2 input-reset ba bg-transparent hover-bg-light-purple hover-white w-100 mt3" 
            type="email" 
            placeholder="email"  
            id="email-address" required/>

            <input 
            onChange={this.onPasswordChange}
            className="pa2 input-reset ba bg-transparent hover-bg-light-purple hover-white w-100 mt3" 
            type="password" 
            placeholder="password"  
            id="password" required/>
          </div>
        </fieldset>
        <input 
          onClick={this.onSubmitRegister}
          className="b ph3 pv2 input-reset ba b--purple bg-transparent grow pointer f6 dib purple" 
          type="submit" 
          value="Register"/>
      </div>
      </main>
  );
}
  }


export default Register;