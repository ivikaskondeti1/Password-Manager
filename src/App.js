import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

class App extends Component {
  state = {
    websiteName: '',
    userName: '',
    password: '',
    listItem: [],
    searchString: '',
    showPasswordValue: false,
  }

  upadateWebsite = event => {
    this.setState({websiteName: event.target.value})
  }

  upadateUsername = event => {
    this.setState({userName: event.target.value})
  }

  upadatePassword = event => {
    this.setState({password: event.target.value})
  }

  upadateSearchString = event => {
    this.setState({searchString: event.target.value})
  }

  showPassword = () => {
    console.log('event trggeres')
    this.setState(prevState => ({
      showPasswordValue: !prevState.showPasswordValue,
    }))
  }

  submitPassword = event => {
    event.preventDefault()
    const {websiteName, userName, password} = this.state
    const newObj = {
      id: uuidv4(),
      websiteName,
      userName,
      password,
    }
    this.setState(prevState => ({
      listItem: [...prevState.listItem, newObj],
      websiteName: '',
      userName: '',
      password: '',
    }))
  }

  deleteArray = val => {
    const {listItem} = this.state
    console.log(val)
    const resultPasswordList = listItem.filter(
      eachItem => !eachItem.id.includes(val),
    )
    this.setState({listItem: resultPasswordList})
  }

  render() {
    const {
      listItem,
      searchString,
      websiteName,
      userName,
      password,
      showPasswordValue,
    } = this.state
    let resultPasswordArray = null
    let isEmptyList = listItem.length !== 0
    console.log(isEmptyList)
    const deletePassword = event => {
      console.log(
        'event.currentTarget.dataset.id',
        event.currentTarget.dataset.id,
      )
      const val = event.currentTarget.dataset.id
      this.deleteArray(val)
    }

    if (searchString.length === 0) {
      resultPasswordArray = listItem
      console.log('searchstring is empty', resultPasswordArray)
    } else {
      resultPasswordArray = listItem.filter(eachItem =>
        eachItem.websiteName.toLowerCase().includes(searchString.toLowerCase()),
      )

      console.log('search is not empty', resultPasswordArray)
    }
    if (resultPasswordArray.length === 0) {
      isEmptyList = false
    }

    return (
      <div className="MainPage">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="AppLogoStyle"
        />
        <div className="formFieldContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="passImageContainer"
          />
          <form onSubmit={this.submitPassword}>
            <div className="FormContainer">
              <h1 className="headingform">Add New Password</h1>
              <div className="InputFieldBlock">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="InputImageStyle"
                />
                <input
                  value={websiteName}
                  onChange={this.upadateWebsite}
                  className="InputStyle"
                  type="text"
                  placeholder="Enter Website"
                />
              </div>

              <div className="InputFieldBlock">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="InputImageStyle"
                />
                <input
                  value={userName}
                  onChange={this.upadateUsername}
                  className="InputStyle"
                  type="text"
                  placeholder="Enter Username"
                />
              </div>
              <div className="InputFieldBlock">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="InputImageStyle"
                />
                <input
                  value={password}
                  onChange={this.upadatePassword}
                  className="InputStyle"
                  type="password"
                  placeholder="Enter Password"
                />
              </div>
              <button type="submit" className="SubmitButtom">
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="resultFormContainer">
          <div className="resultBlockHeaderContainer">
            <div>
              <h1 className="passwor">Your Passwords</h1>
              <p className="PasswordCount">{resultPasswordArray.length}</p>
            </div>
            <div className="SearchFieldBlock">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="SearchImageStyle"
              />
              <input
                onChange={this.upadateSearchString}
                className="SearchStyle"
                type="search"
                placeholder="Search"
                required
              />
            </div>
          </div>
          <hr />
          <div className="checkbox">
            <input
              onClick={this.showPassword}
              className="SearchStyle"
              type="checkbox"
              placeholder="Search"
              id="password1"
              name="password1"
              required
            />
            <label htmlFor="password1">Show passwords</label>
          </div>
          {isEmptyList ? (
            <ul className="ListContainer">
              {resultPasswordArray.map(eachlist => (
                <li className="ListItem" key={eachlist.id}>
                  <h1 className="WebsiteIcon">
                    {eachlist.userName.slice(0, 1)}
                  </h1>
                  <div className="WebsiteDetails">
                    <p className="webpara">{eachlist.websiteName}</p>
                    <p className="webpara">{eachlist.userName}</p>
                    {showPasswordValue ? (
                      <p className="webpara">{eachlist.password}</p>
                    ) : (
                      <img
                        className="startImage"
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                      />
                    )}
                  </div>
                  <button
                    data-id={eachlist.id}
                    type="submit"
                    onClick={deletePassword}
                    testid="delete"
                    className="deleteButton"
                  >
                    <img
                      className="deleteIcon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="NopasswordContainer">
              <img
                className="noPasswordImage"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p>No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
