import React, { Component } from "react";
import ChatAPI from "./ChatAPI";

class CounterClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      theme: "light",
      font: 12
    };
    this.increment = this.increment.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  // do something after this component is rendered for the first time
  componentDidMount() {
    console.log("[Class component] did mount");
    // this will not resubcribed when friendId props change
    ChatAPI.subscribe(this.props.friendId, id => {
      console.log(`[Class component] subscribe to ChatAPI`);
      console.log(`[Class component] listen status of friend-${id}`);
    });
  }

  // do something after rerender
  componentDidUpdate(prevProps, prevState) {
    console.log("[Class component] did update");
    // # unsubscribe then subscibe again with different friendId
    // why do this? because when the friendId change, the subscribed id
    // in ChatAPI is still holds the previous id so it will display wrong friend status
    // and when componentWillUnmount get called it will unsubscribe to the current friendId
    // so it also causes memory leak
    if (prevProps.friendId !== this.props.friendId) {
      // the if above will prevent this effect to get called when friendId hasn't changed
      // it will make the component performs better
      ChatAPI.unsubscribe(prevProps.friendId, id => {
        console.log(`[Class component] stop listen to status of friend-${id}`);
        console.log(`[Class component] unsubscribe to ChatAPI`);
      });
      ChatAPI.subscribe(this.props.friendId, id => {
        console.log(`[Class component] subscribe to ChatAPI`);
        console.log(`[Class component] listen status of friend-${id}`);
      });
    }
    // apply this effect only if count state changed
    if (prevState.count !== this.state.count) {
      console.log(`[Class component] counter change`);
    }
  }

  componentWillUnmount() {
    // cleanup
    ChatAPI.unsubscribe(this.props.friendId, id => {
      console.log(`[Class component] stop listen to status of friend-${id}`);
      console.log(`[Class component] unsubscribe to ChatAPI`);
    });
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  toggleTheme() {
    this.setState({
      theme: this.state.theme === "light" ? "dark" : "light"
    });
  }

  render() {
    return (
      <div
        className="counter-box"
        style={{
          background: this.state.theme === "light" ? "white" : "black"
        }}
      >
        <h4
          style={{
            color: this.state.theme === "light" ? "black" : "white"
          }}
        >
          Class Component
        </h4>
        <p
          style={{
            fontSize: this.state.font,
            color: this.state.theme === "light" ? "black" : "white"
          }}
        >
          Counter: {this.state.count}
        </p>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.toggleTheme}>Toggle Theme</button>
      </div>
    );
  }
}

export default CounterClass;
