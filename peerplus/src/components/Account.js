import React, {Component} from "react";
import {auth} from "../constants/firebase";
import axios from "axios";

class App extends Component {
  state = {
    friends: []
  };

  componentDidMount() {
    auth.getRedirectResult().then(result => {
      if (result.credential) {
        var token = result.credential.accessToken;
        axios
          .get(
            `https://graph.facebook.com/me/friends?access_token=${token}&fields=name,id,picture`
          )
          .then(result => this.setState({friends: result.data.data}))
          .catch(error => console.log(error));
      }
    });
  }

  render() {
    return (
      <div>
        <header>
          <h1>account</h1>
        </header>
        <ul>
          {this.state.friends &&
            this.state.friends.map(friend => (
              <li className="tc pa3 pa5-ns" key={friend.id}>
                <article className="hide-child relative ba b--black-20 mw5 center">
                  <img
                    src={friend.picture.data.url}
                    className="db"
                    alt={`${friend.name}`}
                  />
                  <div className="pa2 bt b--black-20">
                    <a className="f6 db link dark-blue hover-blue">
                      {friend.name}
                    </a>
                    <a className="link tc ph3 pv1 db bg-animate bg-dark-blue hover-bg-blue white f6 br1">
                      Add Friend
                    </a>
                  </div>
                  <a className="child absolute top-1 right-1 ba bw1 black-40 grow no-underline br-100 w1 h1 pa2 lh-solid b">
                    ×
                  </a>
                </article>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default App;
