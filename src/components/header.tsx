import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import Paper from '@material-ui/core/Paper';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

const styles = () => createStyles({
  root: {
    flexGrow: 1,
  },
});

interface InterfaceHeaderProps extends WithStyles<typeof styles> {
  location: string,
  push: (url: string) => void,
}
class Header extends React.Component<InterfaceHeaderProps> {
  state = {
    value: this.props.location,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.push(value);
  };
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor='primary'
          textColor='primary'
          centered
        >
          <Tab value='/' label='Logo' />
          <Tab value='/products' label='Products' />
          <Tab value='/customers' label='Customers' />
          <Tab value='/invoices' label='Invoices' />
          <Tab value='/add_invoice' label='New Invoice' />
        </Tabs>
      </Paper>
    );
  }
}
function mapStateToProps(state) {
  return {
    location: state.routing.location.pathname,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    push: bindActionCreators(push, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Header));
