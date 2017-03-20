import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './components/footer';
import NewList from './components/newList';
// import Recipes from './components/getRecipes';

const config = {
	apiKey: "AIzaSyC_Y8rWLF1WaJagLF-F8KrRg3jcBd0uFxE",
	authDomain: "groceryapp-e1b5d.firebaseapp.com",
	databaseURL: "https://groceryapp-e1b5d.firebaseio.com",
	storageBucket: "groceryapp-e1b5d.appspot.com",
	messagingSenderId: "574585278947"
};
firebase.initializeApp(config);

const apiKey = 'b9179a65bb3eda8f5397ac2b108205a9';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			lists: [],
			loggedin: false
		}
		this.addList = this.addList.bind(this);
		this.createUser = this.createUser.bind(this);
		this.showLogin = this.showLogin.bind(this);
		this.loginUser = this.loginUser.bind(this);
	}
	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				firebase.database().ref(`users/${user.uid}/lists`).on('value', (data) => {
					const userData = data.val();
					const  dataArray = [];
					for(let objKey in userData) {
						userData[objKey].key = objKey;
						dataArray.push(userData[objKey])
					}
					this.setState({
						lists: dataArray,
						loggedin: true
					})
				});
			}
			else {
				this.setState({
					lists: [],
					loggedin: false
				})
			}	
		})
	}
	addList(e) {
		e.preventDefault();
		const list = {
			item: this.item.value,
			checked: false	
		};
		const userId = firebase.auth().currentUser.uid;
		const dbRef = firebase.database().ref(`users/${userId}/lists`);
		dbRef.push(list);

		this.item.value = '';
	}
	removeList(listId) {
		const userId = firebase.auth().currentUser.uid;
		const dbRef = firebase.database().ref(`users/${userId}/lists/${listId}`);
		dbRef.remove();
	}
	onChange(e,listId,item) {
		const userId = firebase.auth().currentUser.uid;
		const dbRef = firebase.database().ref(`users/${userId}/lists/${listId}`);
		dbRef.set({
			item: item,
			checked: e.target.checked
		});
	} 
	createUser(e) {
		e.preventDefault();
		//Check that passwords match and that they are at least six characters
		//if so, we want to create a user
		const email = this.createEmail.value;
		const password = this.createPassword.value;
		const confirm = this.confirmPassword.value;
		if (password === confirm) {
			firebase.auth()
				.createUserWithEmailAndPassword(email, password)
				.then((data) => {
					this.showLogin(e);
				})
				.catch((err) => {
					alert(err.message)
				})
		} else {
			alert("Passwords must match")
		}
	}
	showLogin(e) {
		e.preventDefault();
	}
	loginUser(e) {
		e.preventDefault();
		const email= this.userEmail.value;
		const password = this.userPassword.value;
		firebase.auth()
			.signInWithEmailAndPassword(email, password)
			.then((data) => {
				this.showLogin(e);
			})
			.catch((err) => {
				alert(err.message);
			})
	}
	logOut() {
		firebase.auth().signOut();
	}
	renderCards() {
		if(this.state.loggedin) {

			const arrayOne = this.state.lists.filter(item => {
			  return item.checked === false;
			}).reverse();

			const arrayTwo = this.state.lists.filter(item => {
			  return item.checked === true;
			})

			const combinedArrays = arrayOne.concat(arrayTwo);
			return combinedArrays.map((list,i) => {
			// return this.state.lists.map((list,i) => {
                return (
                        <div className="items">
                            <NewList data={list} removeList={this.removeList} onChange={this.onChange} key={`list-${i}`}/>
                        </div>
                )
            });
        }
        else {
            return (<h2>Please log in to add notes</h2>);
        }
    }
	render() {
		return (
			<div>
				<section className="wrapper">
						{
							(() => {
								if(this.state.loggedin) {
									return (
										<div>
											<nav>
												<ul>
												<li><a href="" onClick={this.logOut}>Log Out</a></li>
												</ul>
											</nav>
											<h1>The Grocery List <i className="fa fa-shopping-cart" aria-hidden="true"></i></h1>
											<p className="inside">Simply add each grocery item one at a time and watch your list generate. </p>
											<form onSubmit={this.addList} className="addGroceryItem">
												<input type="text" name="item" ref={ref => this.item = ref} />
												<button className="addGrocery">Add Item</button>
											</form>
											<div className="recipeList">
												<h3> My Grocery List</h3>
												{this.renderCards()}
											</div>
											<p className="inside">Need some inspiration? Check out <a href="http://laurakolstein.com/projectFour/" className="title" target="_blank">What's for Dinner Tonight?</a> to find your next recipe.</p>
										</div>	
									)
								}
								else {
									return (
										<div>
											<h1>The Grocery List <i className="fa fa-shopping-cart" aria-hidden="true"></i></h1>
											<p>Say goodbye to the scrap pieces of paper you scribble your grocery list on. <span className="appTitle">The Grocery List</span> is here to help you get organized for your next trip to the supermarket! Sign up or log in to create your list!</p>
											<div className="signIn">
												<form onSubmit={this.createUser} className="user-form">
													<h3>Sign up</h3>
													<input type="text" name="createEmail" ref={ref => this.createEmail = ref} placeholder="Email:"/>
													<input type="password" name="createPassword" ref={ref => this.createPassword = ref} placeholder="Password:"/>
													<input type="password" name="confirmPassword" ref={ref => this.confirmPassword = ref} placeholder="Confirm Password:"/>
													<button className="logIn">Sign Up</button>
												</form>
												<form onSubmit={this.loginUser} className="user-form">
													<h3>Log in</h3>
													<input type="text" name="email" ref={ref => this.userEmail = ref} placeholder="Email:"/>
													<input type="password" name="password" ref={ref => this.userPassword = ref} placeholder="Password:"/>
													<button className="logIn">Log In</button>
												</form>
											</div>
										</div>
									)									
								}										
							})()
						}				
				</section>
				<Footer />
			</div>
		)
	}
}

ReactDOM.render(<App/>,document.getElementById('app'));