import React,{Component} from 'react';
import $ from 'jquery';

import notify from '../../node_modules/bootstrap-notify';
export class Form extends Component {
  static defaultProps = {
      deptart : [{key:'101',value:'IT Department'},
                 {key:'102',value:'Finance Department'},
                 {key:'103',value:'Engineering Department'}],

      positionIt : [{key:'101',value:'Web Developer'},
                     {key:'102',value:'Team Leader'},
                     {key:'103',value:'Mobile Developer Super Stock'}],
        positionFi : [{key:'101',value:'Management'},
                       {key:'102',value:'Accounting'},
                       {key:'103',value:'treasurer'}
                      ],
          positionEd : [ {key:'101',value:'Mason'},
                         {key:'102',value:'Engineering lvl1'},
                         {key:'103',value:'Engineering lvl2'}]
  }
  componentDidMount() {
    var THIS = this;
           $.ajax({
            url: "http://localhost:3200/employee",
            type: "GET",
            data: {},
            dataType: 'json',
            success: function(data){
            this.setState({data: data}, // on successful assign it to todo property
            function(){   // call_back func to print
              //  console.log('May laman itong data-->'+ JSON.stringify(this.state.data));
            });
         }.bind(this),
         error: function(xhr, status, err){  // on error print error
            console.log(err);
         }
      });
  }
  constructor(props){
    super();
    this.state = {
      newList:{},
      data:[],

      selectValue:''

    };

  }

  handleSubmit(e){
    var THIS =this;
    $.notify({
    	// options
    	message: 'Hello World'
    },{
    	// settings
    	type: 'danger'
    });
    this.setState({newList:{

      last_name:this.refs.last_name.value,
      first_name:this.refs.first_name.value,
      department: this.refs.department.value,
      position: this.refs.position.value
    }}, function(){
    console.log("asdasda"+JSON.stringify(this.state.newList));
    fetch("http://localhost:3200/employee/", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    //make sure to serialize your JSON body
    body: JSON.stringify(
      this.state.newList
    )
  }).then((data) => data.json()
  ).then( (response) => {
    console.log("aaa----->"+JSON.stringify(response))
     let projects = THIS.state.data;
     projects.push(response);
     THIS.setState({projects:projects});
  });
  })
  }
  handleDelete(id){
        var THIS = this;
           $.ajax({
            url: "http://localhost:3200/employee/delete/"+id,
            type: "POST",
            data: {},
            dataType: 'json',
            success: function (response) {
              console.log("ADD data finish-->" + JSON.stringify(response));
              // THIS.setState({data: response});
              let selectedIndex = THIS.state.data;
              let index = selectedIndex.findIndex(x=> x._id === id);
              selectedIndex.splice(index,1);
              THIS.setState(selectedIndex:selectedIndex)

            }
          });
  }

  handleChange = (e) => {
    this.setState({selectValue:e.target.value})
  }
  handleknown(e){
    console.log(this.state.department);
  }
  handleEdit(e){
    if(this.refs.last_name.value===''){
      console.log('Empty Fields!');
    }else{
      this.setState({newList:{
        last_name:this.refs.last_name.value,
        first_name:this.refs.first_name.value,
        department: this.refs.department.value,
        position: this.refs.position.value
      }},function(){
        var THIS = this;
           $.ajax({
            url: "http://localhost:3200/employee",
            type: "POST",
            data: this.state.newList,
            dataType: 'json',
            success: function (response) {
              console.log("ADD data finish-->" + JSON.stringify(response));
              // THIS.setState({data: response});
              let projects = THIS.state.data;
              projects.push(response);
              THIS.setState({projects:projects});
                document.getElementById("create-course-form").reset();
            }
          });
      });
    }
      e.preventDefault();
  }

  handleView(id){
    fetch("http://localhost:3200/employee/"+id)
               .then( (response) => {
                   return response.json() })
                       .then( (json) => {
                         this.setState({
                             last_name:json.last_name,
                             first_name:json.first_name,
                             department:json.department,
                             position:json.position
                         })
                       });


  }

  render() {
    let depList;
    depList = this.props.deptart.map(function(data, key){
      return (
        <option key={key} value={data.value}>{data.value}</option> )
    });

    let postion;
  if(this.state.selectValue== "IT Department"){


      postion = this.props.positionIt.map(function(data, key){
        return (
          <option key={key} value={data.value}>{data.value}</option> )
        })

  }else if(this.state.selectValue== "Finance Department"){


      postion = this.props.positionFi.map(function(data, key){
        return (
          <option key={key} value={data.value}>{data.value}</option> )
        })

  }else{


      postion = this.props.positionEd.map(function(data, key){
        return (
          <option key={key} value={data.value}>{data.value}</option> )
        })

  }


    let dataList;
    if(this.state.data){
      dataList = this.state.data.map(item => {
        return(

          <tr className="table-success" key ={item._id}>
              <td className="table-active"> {item.last_name}</td>
              <td className="table-active"> {item.first_name} </td>
              <td className="table-active"> {item.department} </td>
              <td className="table-active"> {item.position} </td>
              <td className="table-active"> <button className='btn btn-success' onClick={this.handleEdit.bind(this,item._id)}>Edit</button> <button className="btn btn-primary" onClick={this.handleView.bind(this,item._id)}> View</button> <button className='btn btn-danger' onClick={this.handleDelete.bind(this,item._id)}>Delete</button> </td>
          </tr>
          )
      })
    }
      return (
  <div className='container'>
    <div className='row flipInX animated'>
        <div className="col-sm-12">
          <div className="card border-primary mb-3">
            <div className="card-header">Forms Input</div>
            <div className='panel panel-default'>
              <div className="card-body">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    ref='last_name'
                    value={this.state.last_name}
                    className = "form-control"
                    placeholder="Enter Name here.."
                  />
                  <label>First Name:</label>
                  <input
                    type="text"
                    ref='first_name'
                    value={this.state.first_name}
                    className = "form-control"
                    placeholder="Enter Name here.."
                  />

                  <div className="form-group">
                    <label>Department:</label>
                    <select className="form-control" id="" ref='department' onChange={this.handleChange}>


                    {depList}

                    </select>

                  </div>
                  <div className="form-group">
                    <label>Position:</label>
                    <select className="form-control" id="" ref='position' value={this.state.position}>
                    {postion}
                    </select>
                  </div>
                  <br/>
                  <div className="pull-left">
                    <button type="button" className="btn btn-success" onClick={this.handleSubmit.bind(this)}>Insert</button>
                    &nbsp;
                    <button type="button" className="btn btn-danger pull-left">Cancel</button>
                  </div>
              </div>
              </div>
          </div>
        </div>
              <div className='col-sm-12'>
                  <div className="table-responsive">
                      <table className="table">
                         <tbody>
                           <tr>
                             <th>Last Name</th>
                             <th>First Name</th>
                             <th>Department</th>
                             <th>Position</th>
                             <th>Action</th>
                           </tr>
                            {dataList}
                           </tbody>
                         </table>
                       </div>
                     </div>
          </div>
          </div>

      )
    }
}
export default Form;
