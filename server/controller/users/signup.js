const mongoose = require('mongoose');

// signup
module.exports = {
  post: (req, res) => {
    const todoSchema = new mongoose.Schema(
      {
        todoid: { type: Number, required: true, unique: true },
        content: { type: String, required: true },
        completed: { type: String, default: false },
      },
      { collection: 'my-collection-name' }
    );

    const Todo = mongoose.model('Todo', todoSchema);

    const todo = new Todo({
      todoid: 2,
      content: 'MongoDB',
      completed: false,
    });

    todo.save().then(() => console.log('Saved successfully'));
    // todo.save.then(() => console.log('Saved successfully'));

    if (false) {
      return res.status(400).json({ message: 'not authorized' });
    } else {
      return res.status(200).json({ message: 'signup ok' });
      // return res.status(200).json({ message: 'ok' });
    }
  },
};
