var Firebase = require('firebase');
const Rebase = require('re-base');
const base = Rebase.createClass('https://newspath.firebaseio.com/');
var newsList = [];

class App extends React.Component {
	// Constructor
	constructor(props) {
    	super(props);
    	this.state = {
        	NewsAmount: 0,
        	likedIndex: [],
        	dislikedIndex: [],
        	readIndex: [],
        	newspath: [],
      	};
  	}

  	componentWillMount() {
  		var newsList = [];
  		var rootRef = new Firebase('https://newspath.firebaseio.com');
  		rootRef.on("value", function(snapshot) {
  			console.log(snapshot.val());
  			newsList = snapshot.val();
			}, function (errorObject) {
  			console.log("The read failed: " + errorObject.code);
		});

		var listKeys = [];
		for(var key in newsList){
			listKeys.push(key);
		}

		console.log(listKeys);

		var newsObjectArray = [];
		for(var i = 0; i<Object.keys(newsList).length; i++){
			console.log(newsList[Object.keys(newsList)[i]]);
			newsObjectArray.push(newsList[Object.keys(newsList)[i]]);
		}

		console.log(newsObjectArray[0]);
	}

  	componentWillUnmount() {
    	base.removeBinding(this.ref);
  	}

  	// Action functions
  	SetStateTen() {
  		this.setState({NewsAmount : this.state.NewsAmount+10});
  	}

  	refresh(){
  		var newsList = [];
  		var rootRef = new Firebase('https://newspath.firebaseio.com');
  		rootRef.on("value", function(snapshot) {
  			console.log(snapshot.val());
  			newsList = snapshot.val();
			}, function (errorObject) {
  			console.log("The read failed: " + errorObject.code);
		});

		var listKeys = [];
		for(var key in newsList){
			listKeys.push(key);
		}

		console.log(listKeys);
		/*
		var newsObjectArray = this.state.newspath;
		for(var key in listKeys){
			newsObjectArray.push(newsList[key]);
		}
		*/

		var newsObjectArray = [];
		for(var i = 0; i<Object.keys(newsList).length; i++){
			newsObjectArray.push(newsList[Object.keys(newsList)[i]]);
		}

		this.setState({
			newspath : newsObjectArray,
			NewsAmount : newsObjectArray.length
		});
  	}

  	// Render Here
  	render() {
  		var newses = [];
  		var newsRefresh = React.createElement('Button',{className:'btn btn-warning',onClick:this.refresh.bind(this),key:310},'Refresh');
  		newses.push(newsRefresh);

  		for(var i = 0 ; i<this.state.NewsAmount ; i++){
  			var news = <News value = {this.state.newspath[i]}/>
  			var newsLine = React.createElement('div',{key:i},news);
  			newses.push(newsLine);
  		};

  		return React.DOM.div(null,newses);	
  	}
}

class News extends React.Component {
	constructor(props){
		super(props);
    	this.state = {
        	liked: 0,
      	};
	}

	render(){
		const { key, children ,value } = this.props;
		var like = React.DOM.button({key: 0, className: 'btn btn-success'},'LIKE');
		var hate = React.DOM.button({key: 1, className: 'btn btn-danger'},'DON\'T LIKE');

		var newsTitle = React.DOM.h4(null,value.title);
		var newsTime = React.DOM.div(null,value.time);
		var newsContent = React.DOM.p(null,value.content);
		var newsAll = [newsTitle,newsTime,newsContent];

		var content = React.DOM.div({key: 2},newsAll);

		var newsChildren = [hate,like,content]
		var toRender = React.DOM.div({className:'bs-callout bs-callout-default'},newsChildren);
		return toRender;
	}
}

ReactDOM.render(<App />, document.getElementById('root'));