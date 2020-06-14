import React, { Component } from 'react';

export default class UserCreate extends Component {
    constructor(props){
        super(props);

        this.onChangeUserCode = this.onChangeUserCode.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeDepartmentCode = this.onChangeDepartmentCode.bind(this);
        this.onChangeUserActive = this.onChangeUserActive.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            usercode: '',
            username: '',
            departmentcode: '',
            useractive: true,
            departments: []
        }
    }

    componentDidMount(){
        this.setState({
            departments: ['test department'],
            departmentname: 'test department'
        });
    }

    onChangeUserCode(e){
        this.setState({
            usercode: e.target.value
        });
    }

    onChangeUserName(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangeDepartmentCode(e){
        this.setState({
            departmentcode: e.target.value
        });
    }

    onChangeUserActive(e){
        this.setState({
            useractive: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            usercode: this.state.usercode,
            username: this.state.username,
            departmentcode: this.state.departmentcode,
            useractive: this.state.useractive
        };

        console.log(user);

        window.location = '/users';
    }

    render() {

        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>User Code: </label>
                        <input type="text" required className="form-control" value={this.state.usercode} onChange={this.onChangeUserCode} />
                    </div>
                    <div className="form-group">
                        <label>User Name: </label>
                        <input type="text" required className="form-control" value={this.state.username} onChange={this.onChangeUserName} />
                    </div>

                    <div className="form-group">
                        <label>Department: </label>
                        <select ref="userInput" required className="form-control" value={this.state.departmentcode} onChange={this.onChangeDepartmentCode}>
                            {
                                this.state.departments.map( department => {
                                    return <option key={department} value={department.departmentcode}>{department}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>User Active: </label>
                        <input type="checkbox" className="form-control" value={this.state.useractive} onChange={this.onChangeUserActive} />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}