import React, { Component } from 'react';
import './App.css';
import Navigation from '../components/Navigation';
import Rank from '../components/Rank';
import ImageLinkForm from '../components/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition';
import SignIn from '../components/SignIn';
import Register from '../components/Register';
import Clarifai  from 'clarifai';

const app = new Clarifai.App({ apiKey: '468d36b8496a4403be1fbbe7b1c3a087' });


class App extends Component {
//we need state so the app knows the value that the user enter, remeber and updates at any time
  constructor(){
  	super();
  	this.state = {
  		input: '',
  		imageUrl: '',
  		box: {},
      route: 'SignIn',
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''

      }
  	}
  }

  loadUser = (data) => {
    this.setState({
      user: { 
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined 
    }})
  }


  calculateFaceLocation = (data) => {
  	const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  	const image = document.getElementById('inputimage');
  	const width = Number(image.width);
  	const height = Number(image.height);
  	return {
  		leftCol: clarifaiFace.left_col * width,
  		topRow: clarifaiFace.top_row * height,
  		rightCol: width - (clarifaiFace.right_col * width),
  		bottomRow: height - (clarifaiFace.bottom_row * height)
  	}	
  }

  displayFaceBox = (box) => {
  	console.log(box);
  	this.setState({box})
  }

  //it is a property of the app
  onInputChange = (event) => {
  	this.setState({input:event.target.value});
  }

  onImageSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/image',
        {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ id: this.state.user.id })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count}))
        })  
      }

    this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));		
  }



  onRouteChange = (route) => {
    this.setState({route: route})
    this.setState({imageUrl: ''});
  }

  render() {
    return (
      <div className="App">
{ 
      this.state.route === 'home' ? 
      <div>
        <Navigation onRouteChange={this.onRouteChange} />
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
      : ( this.state.route === 'SignIn') ?
      <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      : 
      <Register 
      loadUser={this.loadUser}
      onRouteChange={this.onRouteChange}/> 


}
</div>
    );
  }


}

export default App;
