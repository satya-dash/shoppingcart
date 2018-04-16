import React, {PureComponent } from 'react';

class Notify extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            name: props.name
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            name: nextProps.name
        },()=>{
            setTimeout(()=>{
                this.setState({
                    name: ''
                });       
            },3000);
        });

    }

    render(){
        let {name} = this.state;
        return(
            <div className="notifyDiv">
                {name &&
                    `${name} has been successfully added`
                }
            </div>  
        );
    }

}

export default Notify;