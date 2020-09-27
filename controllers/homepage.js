const express = require("express");

const homepage = (req, res) => {
  res.render("index", { title: "Express" });
};

module.exports = {
  homepage,
};
