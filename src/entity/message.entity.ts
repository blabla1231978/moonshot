import { injectable } from 'inversify';
import { Column, CreateDateColumn, Entity,
         ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';
import { MessageInterface } from '../interfaces/message.interface';

@Entity()
@injectable()
export class MessageEntity {

    @PrimaryGeneratedColumn()
    @ObjectIdColumn()
    public id: ObjectID;

    @Column()
    public messageStructure: MessageInterface;

    @CreateDateColumn()
    public createdAt: Date;

    public setMessageEntity(messageStructure: MessageInterface) {
        this.messageStructure = messageStructure;
    }
}
