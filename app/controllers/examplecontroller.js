function index (req, res) {
   res.send("Welcome to NUCLEUS.. Muahahahaha");
}

function prefix(req,res) {
    res.send("Prefix works baby!");
}

module.exports = {
    prefix:prefix,
    index:index,


};