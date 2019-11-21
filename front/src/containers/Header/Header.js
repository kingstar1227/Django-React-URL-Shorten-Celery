import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Collapse, Container, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem }
  from 'reactstrap'
import { logout } from 'redux/modules/auth'

class Header extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    logout: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleLogout = (e) => {
    const { logout } = this.props
    logout()
  }

  render() {
    const { auth } = this.props

    return (
      <div>
        <Navbar color="inverse" inverse toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">Challenge Task</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            {auth.token
            ? <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to='/' onClick={this.handleLogout} className='nav-link'>Logout</Link>
              </NavItem>
            </Nav>
            : <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to='/login' className='nav-link'>Login</Link>
              </NavItem>
              <NavItem>
                <Link to='/signup' className='nav-link'>Sign up</Link>
              </NavItem>
            </Nav>}
          </Collapse>
        </Navbar>
        {auth.token && <Container fluid className='text-right mt-2 mb-2'>
          Welcome!
        </Container>}
      </div>
    )
  }
}

const selector = (state) => ({
  auth: state.auth
})

const actions = {
  logout
}

export default connect(selector, actions)(Header)
