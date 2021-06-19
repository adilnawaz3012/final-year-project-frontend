import React, { Component } from 'react'; 
import "./App.css";
import axios from 'axios';
import logo from "./Logo.jpg"
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
            <div>
                <nav className="navbar navbar-dark bg-dark">
                   <a className="navbar-brand" href="#">
                   <img src={logo} className="d-inline-block align-top" width="30" height="30" alt=""></img>
                    BlindSight
                   </a>
                </nav>
                <div className="container-fluid main d-flex align-items-center">
                    <div className="container card bg-dark dimensions-center">
                        <div className="row justify-content-center">
                            <img src={this.state.file} className = "img-dimensions my-auto"></img>
                        </div>
                        <form className = "" onSubmit={e => { e.preventDefault(); }}>
                        <div className="row justify-content-center" >
                            <div style = {{ width : "250px"}}>
                                <input type="file" class="form-control form-control-sm" name="myFile" onChange={this.onChangeHandler}/>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <button type="button" class="btn btn-primary upload" onClick={this.onClickHandler}>Upload</button>
                            {/* Replace button with spinner on upload */}
                            {/* <div className="spinner-border text-primary" role="status"></div> */}
                        </div>
                        </form>
                        <div class="d-flex justify-content-center">
                            <label style={{ color : "white", marginRight : "10px"}}>Generated Caption</label>
                            <div class="card">
                                    <div class="card-body text-left px-0">
                                        {this.state.recivedJSON === "" ? "" : this.state.recivedJSON.description}
                                    </div>
                            </div>
                            <Speech json={this.state.recivedJSON}/>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default App;
