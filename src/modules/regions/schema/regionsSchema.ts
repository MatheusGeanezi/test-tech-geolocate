import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IGeoJSONPolygon {
  type: string
  coordinates: any[][][]
}

export interface IRegion extends Document {
  name: string
  geometry: IGeoJSONPolygon
  userId: Types.ObjectId
}

const geoJSONPolygonSchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: ['Polygon'],
      required: true,
    },
    coordinates: {
      type: [[]],
      required: true,
    },
  },
  { _id: false },
)

const regionSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    geometry: {
      type: geoJSONPolygonSchema,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Regions = mongoose.model<IRegion>('regions', regionSchema)

export default Regions
