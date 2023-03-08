import { html, component, useState, useEffect } from "haunted";
import "./nv-input.js";
import "./nv-item.js";
import "./nv-toaster.js";

function App() {
  const [drinks, setDrinks] = useState([]);
  const [search, setSearch] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  function showToaster(label) {
    const toaster =
      document.body.querySelector("nv-toaster") ||
      document.createElement("nv-toaster");
    toaster.label = label;
    document.body.appendChild(toaster);

    setTimeout(
      () =>
        document.body.querySelector("nv-toaster")
          ? document.body.removeChild(toaster)
          : null,
      3000
    );
  }

  function searchDrinks(e) {
    e.preventDefault();
    showToaster("Loading...");

    window
      .fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`
      )
      .then((data) => data.json())
      .then((response) => {
        if (response?.drinks?.length > 0) {
          setDrinks(response.drinks);
          showToaster("Here are the results.");
        } else {
          setDrinks([]);
          showToaster("No results found.");
        }
      });
  }

  function addToShoppingList(ingredients) {
    const addedIngredients = [];

    ingredients.forEach((ingredient) => {
      if (!shoppingList.includes(ingredient)) {
        shoppingList.push(ingredient);
        addedIngredients.push(ingredient);
      }
    });

    setShoppingList(shoppingList);

    showToaster(
      addedIngredients?.length > 0
        ? `Added ${addedIngredients.join(", ")} to shopping list`
        : "No new ingredients was added to shopping list"
    );
  }

  function printShoppingList() {
    const shoppingList = document
      .querySelector("body > my-app")
      .shadowRoot.querySelector("#shoppingList");
    window.print();
  }

  return html`
      <form @submit=${searchDrinks}>
        <nv-input
          id="search"
          .placeholder="Search"
          @change=${(ev) => setSearch(ev.detail)}
          @onSubmit=${searchDrinks}
        ></nv-input>
        <button type="submit">Search</button>
      </form>

      <idv class="container">
        <div class="items">
          ${
            drinks &&
            drinks.map((drink) => {
              const ingredients = [];
              for (let i = 1; i <= 15; i++) {
                const propName = `strIngredient${i}`;
                if (drink[propName]) {
                  ingredients.push(drink[propName]);
                } else {
                  break;
                }
              }

              return html`
                <nv-item
                  .id=${drink.idDrink}
                  .name=${drink.strDrink}
                  .image=${drink.strDrinkThumb}
                  .description=${drink.strInstructions}
                  .ingredients=${ingredients}
                  @addToShoppingList=${(ev) => {
                    addToShoppingList(ev.detail);
                  }}
                />
              `;
            })
          }
          ${
            drinks?.length < 1
              ? html`
                  <h3 style="text-align: center;">
                    Search for drinks in the field above to get the best
                    recipes.
                  </h3>
                `
              : null
          }
        </div>
        <div id="shoppingList" class="printout">
          <h3>Shopping List</h3>
          <hr style="margin: 0;" />
          <ul>
            ${shoppingList?.map(
              (shoppingListItem) => html` <li>${shoppingListItem}</li> `
            )}
          </ul>
          <button @click=${printShoppingList}>Print</button>
        </div>
      </div>

      <style>
        @media print {
          * :not(.printout):not(.printout *) {
            display: none;
          }

          .printout {
            display: block;
          }
        }

        form {
          display: flex;
          margin-bottom: 1rem;
          gap: 0.5rem;
        }

        nv-input {
          width: 100%;
        }

        .container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .items, .printout {
          display: flex;
          flex-flow: column wrap;
          flex-basis: 20%;
          flex-grow: 1;
          box-sizing: border-box;
          padding: 0.5rem;
          min-height: 300px;
          background-color: #99738E;
          gap: 0.5rem;
        }

        .items {
          flex-basis: 70%;
        }

        .printout {
          display: block;
          min-width: 250px;
          height: fit-content;
        }

        button {
          background-color: #F64C72;
          color: #FFF;
          border: none;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          margin: 0;
        }
      </style>
    `;
}

customElements.define("my-app", component(App));
