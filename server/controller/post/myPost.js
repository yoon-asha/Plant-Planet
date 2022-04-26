module.exports = async (req, res) => {
  res
    .status(200)
    .json({ success: true, data: { tokenList: [] }, message: 'myPost ok' });
};
