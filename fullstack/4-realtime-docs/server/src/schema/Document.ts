import { Schema, Model, model, HydratedDocument } from "mongoose";

interface IDocument {
  _id: string;
  data: object;
}

interface IDocumentStaticMethods {
  findOrCreate(id: string): Promise<HydratedDocument<IDocument>>;
}

export type IDocumentModel = Model<IDocument> & IDocumentStaticMethods;

const schema = new Schema<IDocument, IDocumentModel>({
  _id: String,
  data: { type: Object, default: "" },
});

schema.statics.findOrCreate = async function (id: string) {
  if (!id) return;
  const doc = await this.findById(id);
  if (doc) return doc;
  return await this.create({ _id: id });
};

export default model<IDocument, IDocumentModel>("Document", schema);
