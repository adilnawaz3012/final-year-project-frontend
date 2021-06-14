import React, { Component } from 'react'; 
import axios from 'axios';
import background from "./doe.jpeg";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            recivedJSON: ""
          }
    }

    onChangeHandler=event=>{
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        });
        console.log(this.selectedFile);
    }

    onClickHandler = () => {
        const data = new FormData();
        data.append('file', this.state.selectedFile);
        console.log("data here", data);
        axios.post("http://localhost:5000/testpage", data, { 
            // receive two    parameter endpoint url ,form data
        })
        .then(res => { // then print response status
            this.setState({ recivedJSON: res.description});
            console.log(res.description);
            // console.log(res.statusText)
         });
    }

    render() {
        return (
        <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundAttachment: "fixed",
        backgroundSize: "100% 200%", height: "840px"}} className="mh-100">
                <nav className="navbar navbar-light bg-light" align="centre">
                <span className="navbar-brand mb-0 h1"> Hi, welcome to our website!!</span>
                </nav>
                <br/>
                <input type="file"  className="btn btn-outline-success my-2 my-sm-0" name="file" onChange={this.onChangeHandler}/>
                <button type="button" className="btn btn-outline-success my-2 my-sm-0" onClick={this.onClickHandler}>Upload</button>
                <br/>
                <hr/><hr/>
                <nav className="navbar navbar-light bg-light" align="centre">
                    <span className="navbar-brand mb-0 h1">
                        <div>
                            {this.recivedJSON === "" ? "" : this.recivedJSON};
                        </div>
                    </span>
                </nav>
        </div>
        );

    }
}

export default App;
