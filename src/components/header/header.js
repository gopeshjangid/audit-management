import React, { PureComponent ,Suspense } from "react";
import {
  Container,
  Nav,
  NavItem,
  Navbar,
  Collapse,
  NavbarBrand,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import Auth from "@aws-amplify/auth";
import { connect } from "react-redux";
import "./../../assets/scss/header.scss";
import { userLogoutRequest } from "./../../actions";
import { clearReducer } from "./../../actions/action.getClaims";
import { clearMasterTableReducer } from "./../../actions/action.masterTable"
import Styled from  "styled-components";
import Avatar from  "react-avatar";

const ProfileToggle = Styled(DropdownToggle)`
 background : none !important;
 border: none !important;
`;
const tabs = [
  {
    key: "claims",
    name: "claims",
  },
  {
    key: "reports",
    name: "reports",
  },
  {
    key: "category",
    name: "category",
  },
];

const logoutTabs = [
  {
    key: "/",
    name: "Home",
  },
];
const style = { width: "67%" };

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      activeTabKey: "claims",
      logoutStatus: false,
      openMenu: false,
    };
  }

  tabClickHandler = (event) => {
    sessionStorage.removeItem("selectedTab");
    let key = event.currentTarget.dataset.key;
    this.setState({ activeTabKey: key });
  };

  logOutUser = (e) => {
    this.setState({
      logoutStatus: true,
    });

    sessionStorage.removeItem("loginClient");
    localStorage.removeItem("userName");
    localStorage.removeItem("userType");
    localStorage.removeItem("login");
    localStorage.removeItem("selectedTab");
    sessionStorage.removeItem("selectedTab");
    sessionStorage.setItem("userSignedIn", false);
    localStorage.removeItem("idToken");
    this.props.history.push("/");

   

    Auth.signOut({ global: true })
      .then(() => {
        this.props.userLogoutRequest();
        this.props.clearReducer();
        this.props.clearMasterTableReducer();
        sessionStorage.clear();
        localStorage.removeItem("login");
        
        const config = Auth.configure();
        const { domain, redirectSignOut } = config.oauth;
        const clientId = config.userPoolWebClientId;
        const url =
          'https://' +
          domain +
          '/logout?logout_uri=' +
          redirectSignOut +
          '&client_id=' +
          clientId;
         window.location.assign(url);
        //this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  tabOutClickHandler = (key) => {
    const path = key === "/" ? "/" : "/" + key;
    this.props.history.push(path);
  };

  showOuterHeaderLinks = () => {
    return ["/forgetPassword", "signUp"].indexOf(this.props.match.path) === -1;
  };

  toggle = () => {
    this.setState({ ...this.state, openMenu: !this.state.openMenu });
  };


  render() {
    let userType = localStorage.getItem('userType');
    console.log("userType" ,userType)
    return (
      <>
        {this.props.match.path !== "/" && (
          <header className="header fixed-top">
            <Container>
              <Navbar color="light" light expand="md">
                <NavbarBrand
                  href={
                    sessionStorage.getItem("loginClient")
                      ? "/claims"
                      : "/"
                  }
                >
                  <img
                    src="https://s3.amazonaws.com/centivo-email-templates/CENHEA_18623-1_LogoWithTrademark_RGB.png"
                    alt=""
                    className="logo-navbar"
                  />
                </NavbarBrand>

                {sessionStorage.getItem("loginClient") &&
                this.props.match.path !== "/" &&
                this.showOuterHeaderLinks() ? (
                  <>
                    <Navbar color="light" style={style}>
                      <Collapse navbar>
                        <Nav className="ml-auto margin-top-5" navbar>
                          <>
                            {tabs.map((tab) => {
                              return (
                                <NavItem
                                  key={tab.key}
                                  className={
                                    window.location.href.indexOf(tab.key) > -1
                                      ? "active"
                                      : ""
                                  }
                                  data-key={tab.key}
                                  onClick={this.tabClickHandler}
                                >
                                  <Link
                                    style={  {pointerEvents:  tab.key === 'category' && localStorage.getItem('userType') === 'EXAMINER' ? 'none' : !userType ? 'none' :  ''}}
                                    to={
                                      "/" +
                                      tab.key
                                    }
                                    className="nav-link categoryLink"
                                  >
                                    {tab.name}
                                  </Link>
                                </NavItem>
                              );
                            })}
                          </>

                          <div style={{ height: "45px !important" }}>
                            <Dropdown
                              isOpen={this.state.openMenu}
                              toggle={this.toggle}
                            >
                              <ProfileToggle
                                color="primary"
                                className="profileToggle"
                              >
                                {
                                 localStorage.getItem("userName") &&  <Avatar color='#00a79d' round={true} size={40} name={localStorage.getItem("userName")} />
                                }
                                 
                              </ProfileToggle>
                              <DropdownMenu>
                                <DropdownItem header>
                                  {localStorage.getItem("userName")}
                                </DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem>
                                  My Profile
                                </DropdownItem>
                                <DropdownItem onClick={this.logOutUser}>
                                  Sign Out
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                        </Nav>
                      </Collapse>
                    </Navbar>
                  </>
                ) : (
                  <Navbar color="light">
                    <Collapse navbar>
                      <Nav className="ml-auto margin-top-5" navbar>
                        <>
                          {logoutTabs.map((tab) => {
                            return (
                              <NavItem
                                key={tab.key}
                                className={
                                  tab.key !== "/" &&
                                  window.location.href.indexOf(tab.key) !== -1
                                    ? "active"
                                    : ""
                                }
                                data-key={tab.key}
                                onClick={() => this.tabOutClickHandler(tab.key)}
                              >
                                <Link className="nav-link">{tab.name}</Link>
                              </NavItem>
                            );
                          })}
                        </>
                        {sessionStorage.getItem("loginClient") &&
                          this.props.match.path !== "/" &&
                          this.showOuterHeaderLinks() && (
                            <NavItem className="logout">
                              <i
                                className="icon icon-logout pointer"
                                onClick={() => this.logOutUser()}
                              />
                            </NavItem>
                          )}
                      </Nav>
                    </Collapse>
                  </Navbar>
                )}
              </Navbar>
            </Container>
          </header>
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogoutRequest: () => dispatch(userLogoutRequest()),
  clearReducer: () => dispatch(clearReducer()),
  clearMasterTableReducer: () => dispatch(clearMasterTableReducer())
});

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.login.userLoggedIn,
  masterTable: state?.masterTable,
});

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withRouter(Header)));
