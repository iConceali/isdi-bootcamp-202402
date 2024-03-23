import Button from "../core/Button.mjs";

class SubmitButton extends Button {
  constructor() {
    super();

    // this.addClass("submit-button");
    this.setType("submit");
  }
}

export default SubmitButton;
