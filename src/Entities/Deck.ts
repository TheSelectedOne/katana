import { Card } from "../Resolvers/deck";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Deck extends BaseEntity {
    @PrimaryColumn({unique: true})
    deckId!: string
    @Column()
    type!: "FULL" | "SHORT"
    @Column()
    shuffled: boolean
    @Column()
    remaining: number
    @Column('jsonb', {default:[]})
    cards: Card[]
}