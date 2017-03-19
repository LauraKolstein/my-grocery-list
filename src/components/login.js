import React from 'react';

export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			formToShow: '',
			email: '',
			password: '',
			confirm: ''
		};
		this.formToShow = this.formToShow.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.signup = this.signup.bind(this);
		this.login = this.login.bind(this);
	}
	formToShow(e) {
		e.preventDefault();
		this.setState({
			formToShow: e.target.className
		})
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	signup(e) {
		e.preventDefault();
		if(this.state.password === this.state.confirm) {
			firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then((data) => {
				console.log(data);
			});		
		}
	}
	login(e) {
		e.preventDefault();
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
		.then((data) => {
			console.log(data);
		});
	}
	logOut() {
	firebase.auth().signOut();
	}
	renderGroceryList() {
	if(this.state.loggedin) {
		return this.state.lists.map((list,i) => {
			return (
				<NewList list={list} key={`list-${i}`} removeList={this.removeList}/>
			)
		}).reverse();
	}
	else {
		return (<h2>Please log in to add notes</h2>);
	}
	}
	render() {
		return (
			<div>
				<div className="signIn">
					<form onSubmit={this.signup} className="user-form user-form-signup">
						<h3>Sign up</h3>
						<input type="email" name="email" onChange={this.handleChange} placeholder="Email:"/>
						<input type="password" name="password" onChange={this.handleChange} placeholder="Password:"/>
						<input type="password" name="confirm" onChange={this.handleChange} placeholder="Confirm Password:"/>
						<button className="logIn">Sign Up</button>
					</form>
					<form onSubmit={this.login} className="user-form user-form-login">
						<h3>Log in</h3>
						<input type="email" name="email" onChange={this.handleChange} placeholder="Email:"/>
						<input type="password" name="password" onChange={this.handleChange} placeholder="Password:"/>
						<button className="logIn">Log In</button>
					</form>
				</div>
			</div>
		)
	}
}