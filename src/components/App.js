import React, { Component } from 'react'; 
import "./App.css";
import axios from 'axios';
import Speech from './Speech';


class App extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        selectedFile: "",
        recivedJSON: "",
        file: null,
        loading: false,
        imgType: "",
        uploadSelect: ""
    };

    onChangeHandler=event=>{
        var fileName = event.target.files[0].name;
        var fileExtension = fileName.split('.').pop();
        if(fileExtension === "png" || fileExtension === "jpg" || fileExtension === "jpeg") {
            this.setState({
                selectedFile: event.target.files[0],
                file: URL.createObjectURL(event.target.files[0]),
                imgType: ""
            });
        } else {
            this.setState({ imgType: "wrong", uploadSelect: ""})
        }
    }

    onClickHandler = () => {
            this.setState({ loading: true});
            const from = this.state.selectedFile;
            console.log("just chekcing ", from);
            var form = new FormData();
            form.append("caption_image", from);
            axios.post("http://127.0.0.1:5000/testpage", form, { 
                // receive two    parameter endpoint url ,form data
            })
            .then(res => { // then print response status
                this.setState({ recivedJSON: res.data, loading: false});
                console.log("Response ", this.state.recivedJSON.description);
            });
    }



    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                   <a className="navbar-brand" href="#" style={{width: "100%", textAlign: "center", fontFamily: "Orbitron", fontSize: '1.5rem'}}>
                   <i class="fa fa-eye fa-lg" aria-hidden="true" style={{marginRight: '0.5rem'}}></i>
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
                                <input type="file" className="form-control form-control-sm" name="myFile" onChange={this.onChangeHandler}/>
                            </div>
                        </div>
                        <div className="row justify-content-center" style={{ textAlign : "center" }} >
                                {this.state.imgType === "wrong" ? 
                                    <label style={{ color : "red", marginRight : "10px", width: "600px"}}>"Only .jpg, .jpeg and .png files are allowed!" </label> : ""
                                }
                        </div>
                        <div className="row justify-content-center">
                        {this.state.loading === false ? 
                            <button type="button" className="btn btn-primary upload"  disabled={!this.state.uploadSelect} onClick={this.onClickHandler}>Upload</button>
                            : <label  className="spinner-border text-primary" role="status"></label>}
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
