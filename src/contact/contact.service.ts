import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './contact.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CreateContactDto } from './dto/create.contact.dto';
import { UpdateContactDto } from './dto/update.contact';

@Injectable()
export class ContactService {
    constructor(@InjectRepository(Contact) private contactRepository: Repository<Contact>,
        @InjectRepository(User) private userRepository: Repository<User>) { }

    async createContact(dto: CreateContactDto): Promise<{ message: string, contact: Contact }> {
        try {
            const existsUser = await this.userRepository.findOne({ where: { email: dto.email } })
            if (!existsUser) {
                throw new NotFoundException("user not found");
            }
            const contact = this.contactRepository.create({ ...dto, user: existsUser })
            await this.contactRepository.save(contact)
            return { message: "contact succesfully create", contact: contact }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException("server error");
        }
    }
    async getOneContact(id: string): Promise<{ message: string, contact: Contact }> {
        try {
            const existsContact = await this.contactRepository.findOne({ where: { id } })
            if (!existsContact) {
                throw new NotFoundException("contact not found");
            }
            return { message: "one contact", contact: existsContact }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException("server error");
        }
    }
    async getAllContact(): Promise<{ message: string, contact: Contact[] }> {
        try {
            const existsContact = await this.contactRepository.find()
            if (!existsContact) {
                throw new NotFoundException("contact not found");
            }
            return { message: "contacts", contact: existsContact }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException("server error");
        }
    }
    async updateContact(id: string, dto: UpdateContactDto): Promise<{ message: string, contact: Contact }> {
        try {
            const existsContact = await this.contactRepository.findOne({ where: { id } })
            if (!existsContact) {
                throw new NotFoundException("contact not found");
            }
            await this.contactRepository.update(id, dto)
            const editContact = await this.contactRepository.findOne({ where: { id } })
            if (!editContact) {
                throw new NotFoundException("contact not found");
            }
            return { message: "update contact", contact: editContact }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException("server error");
        }
    }
    async deleteContact(id: string): Promise<{ message: string }> {
        try {
            const existsContact = await this.contactRepository.findOne({ where: { id } })
            if (!existsContact) {
                throw new NotFoundException("contact not found");
            }
            return { message: "succes delete contact" }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException("server error");
        }
    }
}
