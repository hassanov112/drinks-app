import { html, component, useState, useEffect } from "haunted";

function Input({ id, placeholder }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const event = new CustomEvent("change", {
      detail: `${value}`,
    });
    this.dispatchEvent(event);
  }, [value]);

  const onSubmit = () => {
    const event = new CustomEvent("onSubmit", {});
    this.dispatchEvent(event);
  };

  function keyUpEvent(event) {
    if (event.which === 13) {
      onSubmit();
    } else {
      setValue(event.target.value);
    }
  }

  return html`
    <input
      value=${value}
      @keyup=${keyUpEvent}
      type="text"
      name="${id}"
      id="input"
      placeholder=${placeholder}
    ></input>

    <style>
      input {
        width: -webkit-fill-available;
        border: 1px solid #e5e5e5;
        padding: 6px 10px;
      }
    </style>
  `;
}

customElements.define(
  "nv-input",
  component(Input, { observedAttributes: ["placeholder"] })
);
