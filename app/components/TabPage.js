import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTabs } from '../actions/tabActions'
import TabContent from './TabContent';

class TabPage extends Component {
    constructor(props, context){
        super(props, context);
    }

    componentDidMount() {
        this.props.fetchTabs();
    }

    render() {
        return(
            <TabContent tabs={this.props.tabs}/>
        )
    }
}

TabPage.propTypes = {
    tabs: React.PropTypes.array.isRequired,
    fetchTabs: React.PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        tabs: state.tabs
    }
}
export default connect(mapStateToProps, { fetchTabs })(TabPage);
