import {Entity, Column, OneToMany} from 'typeorm'

import {Quotation} from '../quotation/model'
import {Client} from './Client'

export enum RateUnit {
  hour = 1,
  day = 2,
  service = 3,
}

@Entity()
export class User {
  @Column({primary: true, generated: true})
  id: number

  @OneToMany(() => Client, client => client.user)
  clients: Client[]

  @OneToMany(() => Quotation, quotation => quotation.user)
  quotations: Quotation[]

  @Column({unique: true})
  email: string

  @Column()
  password: string

  @Column({nullable: true, default: null})
  firstName: string

  @Column({nullable: true, default: null})
  lastName: string

  @Column({nullable: true, default: null})
  address: string

  @Column({type: 'int', nullable: true, default: null})
  zip: number

  @Column({nullable: true, default: null})
  city: string

  @Column({nullable: true, default: null})
  phone: string

  @Column({nullable: true, default: null})
  rib: string

  @Column({nullable: true, default: null})
  iban: string

  @Column({nullable: true, default: null})
  bic: string

  @Column({nullable: true, default: null})
  siren: string

  @Column({nullable: true, default: null})
  apeCode: string

  @Column({nullable: true, default: null})
  taxId: string

  @Column({type: 'tinyint', nullable: true, default: null})
  taxRate: number

  @Column({nullable: true, default: null})
  conditions: string

  @Column({nullable: true, default: null})
  rate: number

  @Column({type: 'tinyint', default: RateUnit.hour})
  rateUnit: RateUnit
}
