import { html, component } from "haunted";

function Item({ id, name, image, description, ingredients }) {
  const addToShoppingList = () => {
    const event = new CustomEvent("addToShoppingList", {
      detail: ingredients,
    });
    this.dispatchEvent(event);
  };

  return html`
    <div class="nv-item" id=${id}>
      <img src=${image} />
      <div>
        <h4>${name}</h4>
        <p>${description}</p>
        <p class="ingredients">
          ${ingredients &&
          ingredients.map(
            (ingredient) =>
              html` <span class="ingredient">${ingredient}</span> `
          )}
        </p>
        <button class="add-ingredients" @click=${addToShoppingList}>Add to shopping list</button>
      </div>
    </div>

    <style>
      .nv-item {
        background-color: #242582;
        display: flex;
        flex-flow: row nowrap;
        padding: 0.5rem;
      }

      img {
        margin: 1rem;
        width: 150px;
        height: 150px;
      }

      .ingredients {
        display: flex;
        flex-flow: row wrap;
        gap: 0.5rem;
      }

      .ingredient {
        padding: 0.5rem;
        background-color: #553d67;
        border-radius: 0.2rem;
      }

      .add-ingredients {
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

customElements.define(
  "nv-item",
  component(Item, {
    observedAttributes: ["name", "image", "description", "ingredients"],
  })
);
