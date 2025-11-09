import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RuleDocument = Rule & Document;

@Schema({ _id: false })
export class RuleDays {
  @Prop({ type: Object })
  should: {
    match?: number[];
    channels?: string[];
  };
}

@Schema({ _id: false })
export class RuleRule {
  @Prop({ type: RuleDays })
  days?: RuleDays;
}

@Schema({ _id: false })
export class ElementData {
  @Prop({ type: Number })
  field: number;

  @Prop({ type: String })
  action: string;

  @Prop({ type: [Number] })
  value: number[];

  @Prop({ type: [String] })
  channels: string[];
}

@Schema({ _id: false })
export class StructureElement {
  @Prop({ type: String })
  logicOperator: string;

  @Prop({ type: Number })
  level: number;

  @Prop({ type: String })
  type: string;

  @Prop({ type: ElementData })
  elementData: ElementData;
}

@Schema({
  collection: 'rules',
  versionKey: false,
  timestamps: false
})
export class Rule {
  _id?: Types.ObjectId;

  @Prop({ type: String, required: true, trim: true })
  name: string;

  @Prop({ type: String, trim: true })
  description: string;

  @Prop({ type: RuleRule })
  rule: RuleRule;

  @Prop({ type: [String], default: [] })
  wallets: string[];

  @Prop({ type: Date, default: Date.now })
  creationDate: Date;

  @Prop({ type: Date, default: Date.now })
  lastUpdate: Date;

  @Prop({ type: [StructureElement], default: [] })
  structure: StructureElement[];

  @Prop({ type: Boolean, default: true })
  state: boolean;
}

export const RuleSchema = SchemaFactory.createForClass(Rule);

RuleSchema.index({ wallets: 1 });
RuleSchema.index({ state: 1 });
RuleSchema.index({ 'wallets': 1, 'state': 1 });

