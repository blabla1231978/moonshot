import { injectable } from 'inversify';
import { Column, CreateDateColumn, Entity,
         ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';
import { MessageObjectDto } from '../dataTransferObjects/message-object.dto';

@Entity()
@injectable()
export class Message {

    @PrimaryGeneratedColumn()
    @ObjectIdColumn()
    public id: ObjectID;

    @Column('text', {nullable: false})
    public firstName: string;

    @Column()
    public browser: object;

    @Column()
    public domain: string;

    @CreateDateColumn()
    public createdAt: Date;

    public setMessageEntity(messageObjectDto: MessageObjectDto) {
        this.firstName = messageObjectDto.firstName;
        this.browser = messageObjectDto.browserInfo;
        this.domain = messageObjectDto.domain;
    }
}
