import React, { Component } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import ColorList from "./ColorList";
import NewColorForm from "./NewColorForm";
import Color from "./Color";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: { red: "#FF0000", green: "#00FF00", blue: "#0000FF" },
    };
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(newColor) {
    this.setState((prevState) => ({
      // colors: Object.assign({}, newColor, prevState.colors)
      colors: { ...newColor, ...prevState.colors },
    }));
  }

  render() {
    const ColorListWithColors = () => <ColorList colors={this.state.colors} />;

    const NewColorWithHandler = (props) => (
      <NewColorForm addColor={this.handleAdd} {...props} />
    );

    const ColorWithColor = (props) => {
      const params = useParams();

      const colorName = params.color;
      const color = this.state.colors[colorName];
      return color ? (
        <Color colorName={colorName} color={color} />
      ) : (
        <Navigate to="/colors" />
      );
    };

    return (
      <>
        <Routes>
          <Route exact path="/colors" element={<ColorListWithColors />} />
          <Route path="/colors/new" element={<NewColorWithHandler />} />
          <Route path="/colors/:color" element={<ColorWithColor />} />
          <Route path="*" element={<Navigate to="/colors" />} />
        </Routes>
      </>
    );
  }
}

export default App;
