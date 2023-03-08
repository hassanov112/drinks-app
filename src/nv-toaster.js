import { html, component } from "haunted";

function Toaster({ label }) {
  return html`
    <div class="toast">${label}</div>

    <style>
      @media print {
        * {
          display: none;
        }
      }

      .toast {
        position: fixed;
        bottom: 50px;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #ffffff;
        color: #222222;
        padding: 10px;
        border-radius: 5px;
      }
    </style>
  `;
}

customElements.define(
  "nv-toaster",
  component(Toaster, {
    observedAttributes: ["label"],
  })
);
