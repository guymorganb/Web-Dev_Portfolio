import { Schema, model } from "mongoose";

const appointmentSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name required'],
    minlength: 3,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name required'],
    minlength: 3,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid phone email!`
    },
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  date: {
    type: String,
    required: [true, 'Date required'],
    trim: true,
  },
  massage: {
    type: String,
    required: [true, 'Massage required'],
    trim: true,
  },
  cupping: {
    type: Boolean,
    required: [true, 'Cupping required'],
  },
  contactMethod: {
    type: String,
    required: [true, 'Contact method required'],
    trim: true,
  },
  confirm: {
    type: Boolean,
    default: false,
  },
  rejected: {
    type: Boolean,
    default: false,
  },
  timeWindow: {
    type: String,
    required: [true, 'Time window required'],
  }
});

const Appointment = model('Appointment', appointmentSchema);

export default Appointment;