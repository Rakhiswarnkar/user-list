import React from 'react';
import Axios from 'axios';
import { Card } from '../Card/Card';
import './UserList.css';

export class UserList extends React.Component
{
    state = {
        text : '',
        userList : [],
        filteredUserList : null
    }
    
    componentDidMount(){
        Axios.get('https://api.github.com/users').then((response)=>{
            console.log(response);
            this.setState({userList:response.data})
        })
    }

    handleSorting = (e) =>{
        const {userList} = this.state;
        const SortBy = e.target.value;
        if (SortBy === 'idDsc')
        {
            const sortArrayDsc = userList.sort((a, b)=>{
                return b.id-a.id;
            })
            this.setState({userList:sortArrayDsc})
        }
        if (SortBy === 'idAsc')
        {
            const sortArrayAsc = userList.sort((a, b)=>{
                return a.id-b.id;
            })
            this.setState({userList:sortArrayAsc})
        }
        if (SortBy === 'nameD')
        {
            const sortArrayAsc = userList.sort((a, b)=>{
                const h=a.login.toLowerCase();
                const s=b.login.toLowerCase();
                if(h>s){
                    return -1
                }
                else if(s>h){
                    return 1
                }
                else{
                    return 0
                }
            })
            this.setState({userList:sortArrayAsc})
        }
        if (SortBy === 'nameA')
        {
            const sortArrayAsc = userList.sort((a, b)=>{
                const h=a.login.toLowerCase();
                const s=b.login.toLowerCase();
                if(h>s){
                    return 1
                }
                else if(s>h){
                    return -1
                }
                else{
                    return 0
                }
            })
            this.setState({userList:sortArrayAsc})
        }

    }

    handleInputChange = (ev) => {
        const {value} = ev.target ;
        const arr = this.state.userList.filter((data)=>{
            if (data.login.indexOf(value)>-1){
                return data;
            }
        })
        this.setState({text:value, filteredUserList:arr});
    }

    render(){
       return <div className='main-container'>
            <div className='NavBar'>
           <div>Sort:<select onChange={this.handleSorting}>
               <option >Select</option>
               <option value='nameD'>Name Dsc</option>
               <option value='nameA'>Name Asc</option>
               <option value='idDsc'>Id Dsc</option>
               <option value='idAsc'>Id Asc</option>
               </select></div>
            <div>Search:<input type='text' onChange={this.handleInputChange} value={this.state.text}/></div>
            </div>
       <div className='userList'>
           {(
               this.state.filteredUserList ? this.state.filteredUserList : 
               this.state.userList).map(v=>{
                   return <Card avtarUrl={v.avatar_url} userName={v.login} userId={v.id} gitHubUrl={v.html_url} />
               })
           }
       </div> 
       </div>
    }
}