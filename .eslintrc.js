module.exports = {
  "parser": "babel-eslint",
  "ecmaVersion": 8,
  "sourceType": "module",
  "ecmaFeatures": {
    "impliedStrict": true,
    "jsx": true,
    "experimentalObjectRestSpread": true
  },
  "plugins": [
    "import",
    "react",
    "jsx-a11y"
  ],
  "env": {
    "node": true
  }
};
