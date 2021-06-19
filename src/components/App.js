import React, { Component } from 'react'; 
import "./App.css";
import axios from 'axios';
import background from "./joe.jpg";
import Speech from './Speech';


class App extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        selectedFile: "",
        recivedJSON: "",
        file: null
    };

    onChangeHandler=event=>{
        this.setState({
            selectedFile: event.target.files[0],
            file: URL.createObjectURL(event.target.files[0])
        });
        
        console.log("event.target.files[0] ",event.target.files[0]);
    }

    onClickHandler = () => {
        const from = this.state.selectedFile;
        console.log("just chekcing ", from);
        var form = new FormData();
        form.append("caption_image", from);
        axios.post("http://127.0.0.1:5000/testpage", form, { 
            // receive two    parameter endpoint url ,form data
        })
        .then(res => { // then print response status
            this.setState({ recivedJSON: res.data});
            console.log("Response ", this.state.recivedJSON.description);
         });
    }



    render() {
        return (
        <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundAttachment: "fixed",
        backgroundSize: "100% 100%", height: "820px"}} className="mh-100">
                <nav className="navbar navbar-light bg-light" align="centre">
                    <span className="navbar-brand mb-0 h1"> Hi, welcome to our website!!</span>
                </nav>
                <form onSubmit={e => { e.preventDefault(); }}>
                <input type="file"  className="btn btn-outline-success my-2 my-sm-0" name="myFile" onChange={this.onChangeHandler}/>
                <button type="button" className="btn btn-outline-success my-2 my-sm-0" onClick={this.onClickHandler}>Upload</button>
                </form>
                <br/>
                <div style={{height: "300px", width: "1800px"}}>
                    <img src={this.state.file}  style={{ maxHeight: "100%"}}/>
                </div>
                <br/>
                <nav className="navbar navbar-light bg-light" align="centre">
                    <span className="navbar-brand mb-0 h1">
                        <div>
                            {this.state.recivedJSON === "" ? "" : this.state.recivedJSON.description};
                        </div>
                    </span>
                </nav>
                <div>
                <Speech json={this.state.recivedJSON}/>
                </div>
                
        </div>
        );

    }
}

export default App;
