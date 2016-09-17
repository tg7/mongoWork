var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExampleSchema = new Schema({
  string: {
    type: String,
    trim: true,
    required: "String is Required"
  },
  number: {
    type: Number,
    unique: true,
    required: true
  },
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Please enter a valid e-mail address"],
  },
  boolean: Boolean,
  array: Array,
  date: {
    type: Date,
    default: Date.now
  },
  longstring: {
    type: String,
    validate: [
      //Function takes in the value as an argument
      function(input) {
        //If this returns true, proceed. If not, return an error message.
        return input.length >= 6;
      },
      //Error Message
      'Longstring should be longer.'
    ]
  }

});

var Example = mongoose.model('Example', ExampleSchema);
module.exports = Example;
