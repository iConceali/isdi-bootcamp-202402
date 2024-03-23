import Component from "./Component.mjs";

class Image extends Component {
  constructor() {
    super("img");
  }

  setSource(source) {
    if (typeof source !== "string")
      throw new TypeError("source is not a string");

    this._container.src = source;
  }

  setAlt(altText) {
    if (typeof altText !== "string")
      throw new TypeError("altText is not a string");

    this._container.alt = altText;
  }
}

export default Image;
