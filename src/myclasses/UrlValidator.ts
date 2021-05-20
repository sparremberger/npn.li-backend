const URL = require("url").URL;

const isValidUrl = (s : string) => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

export default isValidUrl;
