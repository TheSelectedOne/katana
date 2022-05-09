/* eslint-disable */
import {BaseEntity, Column, Entity, PrimaryColumn} from 'typeorm';

import {Card} from '../Resolvers/deck';

@Entity()
export class Deck extends BaseEntity {
  @PrimaryColumn({unique: true})
  	deckId!: string;

  @Column()
  	type!: 'FULL' | 'SHORT';

  @Column()
  	shuffled: boolean;

  @Column()
  	remaining: number;

  @Column('jsonb', {default: []})
  	cards: Card[];
}
