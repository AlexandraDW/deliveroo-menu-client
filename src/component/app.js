import React from "react";
import axios from "axios";

class App extends React.Component {
  state = {
    restaurant: null,
    categories: null,
    menus: null,
    isLoading: true
  };
  render() {
    if (this.state.categories === null) {
      return (
        <div>
          <p>Page not loaded !</p>
        </div>
      );
    }
    return (
      <body>
        <h1>Deliveroo</h1>
        <span>
          {" "}
          <h2>{this.state.restaurant.name}</h2>
          <p>{this.state.restaurant.description}</p>
        </span>
        <ul>
          {" "}
          {this.state.categories.map((categorie, index) => {
            return (
              <li className="categorie" key={index}>
                <h2>{categorie} </h2>
                <div className="menus">
                  {this.state.menus[categorie].map(menu => {
                    return (
                      <div className="menu" key={menu.id}>
                        <h3>{menu.title}</h3>
                        <p>{menu.description}</p>
                        {menu.price}
                      </div>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </body>
    );
  }

  async componentDidMount() {
    axios.get("https://deliveroo-api.now.sh/menu").then(response => {
      this.setState({
        restaurant: response.data.restaurant,
        categories: Object.keys(response.data.menu),
        menus: response.data.menu,
        menusLoading: false
      });
      console.log(this.state.categories);
    });
  }
}

export default App;
