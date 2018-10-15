import React from 'react';


class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
  fetch('http://localhost:3000/signin', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: this.state.signInEmail,
      password: this.state.signInPassword
    })
  })
    .then(response => response.json())
    .then(user => {
            if(user.id){
              this.props.loadUser(user);
              this.props.onRouteChange('home');
            }
    })

  }


  render() {
    const { onRouteChange } = this.props;
    return (
    <main className="userForm mw6 center br3 pa3 pa4-ns mv3 bn grow shadow-3">
    <div className="measure center">
      <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <legend className="center f2 fw6 ph0 mh0">Sign In</legend>
        
        <div className="mt3">
          <input onChange={this.onEmailChange} 
          className="pa2 input-reset ba bg-transparent hover-bg-light-purple hover-white w-100 mv3" 
          type="email"  
          placeholder="email"
          id="email"/>
          <input 
          onChange={this.onPasswordChange}
          className="pa2 input-reset ba bg-transparent hover-bg-light-purple hover-white w-100" 
          type="password" 
          placeholder="password"
          id="password"/>
        </div>

      </fieldset>
      <div className="">
        <input 
        onClick={this.onSubmitSignIn}
        className="b ph3 pv2 input-reset ba b--purple bg-transparent grow pointer f6 dib purple" 
        type="submit" 
        value="Sign in"/>
      </div>
        <div className="lh-copy mt3 "><p onClick={() => onRouteChange('Register')} className="pointer f6 link din black-40 db">Register</p></div>
      </div>
    </main>
    ); 
  }
}

export default SignIn;