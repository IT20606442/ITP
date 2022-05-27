import {
  FETCH_ALL_APPOINTMENTS,
  FETCH_APPOINTMENT_BY_ID,
  CREATE_APPOINTMENT,
  UPDATE_APPOINTMENT,
  DELETE_APPOINTMENT,
} from "constants/actionTypes";

const initState = {
  appointments: [],
  appointmentById: [],
  appointmentCreate: {},
  appointmentUpdate: {},
  appointmentDelete: {},
};

const appointmentReducer = (appointment = initState, action) => {
  switch (action.type) {
    // appointment
    case FETCH_ALL_APPOINTMENTS:
      return { ...appointment, appointments: action.payload };
    case FETCH_APPOINTMENT_BY_ID:
      return { ...appointment, appointmentById: action.payload };
    case CREATE_APPOINTMENT:
      return {
        ...appointment,
        appointments: [...appointment.appointments, action.payload],
        appointmentCreate: action.payload,
      };
    case UPDATE_APPOINTMENT: {
      const newAppointment = [...appointment.appointments];
      newAppointment[
        appointment.appointments?.findIndex((item) => item._id === action.payload?._id)
      ] = action.payload;
      return {
        ...appointment,
        appointments: newAppointment,
        appointmentUpdate: action.payload,
      };
    }
    case DELETE_APPOINTMENT: {
      const filterAppointment = appointment.appointments?.filter(
        (item) => item._id !== action.payload?._id
      );
      return {
        ...appointment,
        appointments: filterAppointment,
        appointmentDelete: action.payload,
      };
    }
    default:
      return appointment;
  }
};

export default appointmentReducer;
