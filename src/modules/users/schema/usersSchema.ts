import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IAttendance {
  date: string
  present: boolean
}

export interface IUsers extends Document {
  _id?: Types.ObjectId
  name: string
  email: string
  address?: boolean
  coordinates?: string
}

const usersSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: false,
    },
    coordinates: {
      type: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const Users = mongoose.model<IUsers>('users', usersSchema)

export default Users
