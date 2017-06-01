/**
 * Created by ashwin on 5/29/17.
 */

import React, { Component } from 'react';
import TabContent from './TabContent';

export default class TabPage extends Component {
    constructor(props){
        super(props);
        this.tabs = [];
    }

    componentWillMount() {
        this.tabs = this.getAllTabs();
    }

    render() {
        return(
            <TabContent tabs={this.tabs}/>
        )
    }

    getAllTabs(){
        var temp = [];
        chrome.tabs.query( {}, (tabs) => {
            tabs.forEach((tab) => {
                temp.push(tab);
            });
        });
        return temp;
    }
}
