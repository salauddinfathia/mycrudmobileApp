import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('asset_entry')
export class AssetEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: new Date().getDate()})
  txnDay: number;

  @Column({default: new Date().getMonth()})
  txnMonth: number;

  @Column({default: new Date().getFullYear()})
  txnYear: number;

  @Column()
  description: string;

  @Column()
 asset: string;

  @Column({default: true})
  acquired: boolean
}
