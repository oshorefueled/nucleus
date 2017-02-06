

/*
    This is the index action!
 */
function index (req, res) {
   res.send("Namespace works");
}



module.exports = {
    index:index
};