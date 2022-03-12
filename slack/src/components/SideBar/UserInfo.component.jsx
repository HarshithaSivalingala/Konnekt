import React from 'react';
import { Grid, Header, Icon, Image, Dropdown } from 'semantic-ui-react';
import { connect } from "react-redux";
import firebase from 'firebase';
import Avatar from 'react-avatar';
import logo from "../../konnect_logo.png";
import "./UserInfo.css";

const UserInfo = (props) => {


    const getDropDownOptions = () => {
        return [{
            key: 'signout',
            text: <span onClick={signOut} >Sign Out</span>
        }]
    }

    const signOut = () => {
        firebase.auth()
            .signOut()
            .then(() => console.log("user signed out"));
    }

    if (props.user) {
        return (<Grid>
            <Grid.Column>
                <Grid.Row className="userinfo_grid_row">
                    <Header inverted as="h2">
                        <img src={logo}/>
                        <Header.Content>Konnekt</Header.Content>
                    </Header>
                    <Header className="userinfo_displayname" inverted as="h4">
                        <Dropdown
                            trigger={
                                <span>
                                    <Avatar 
                                    name={props.user.displayName}
                                    size={35}
                                    round='20px'
                                    style={{marginRight:'5px'}}
                                    />
                                    {props.user.displayName}
                                </span>
                            }
                            options={getDropDownOptions()}
                        >
                        </Dropdown>

                    </Header>
                </Grid.Row>
            </Grid.Column>
        </Grid>)
    }
    return null;
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser
    }
}

export default connect(mapStateToProps)(UserInfo);