import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { ContactService } from "./contact.service";
import { CreateContactDto } from "./dto/create.contact.dto";
import { Contact } from "./contact.entity";
import { UpdateContactDto } from "./dto/update.contact";

@Controller("contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}
  @Post("/createContact")
  async createContact(@Body(new ValidationPipe()) dto: CreateContactDto): Promise<{ message: string; contact: Contact }> {
    return this.contactService.createContact(dto);
  }
  @Get("/getOneContact/:id")
  async getOneContact(@Param("id") id: string): Promise<{ message: string; contact: Contact }> {
    return this.contactService.getOneContact(id);
  }
  @Get("/getAllContact")
  async getAllContact(): Promise<{ message: string; contact: Contact[] }> {
    return this.contactService.getAllContact();
  }
  @Put("/edit/:id")
  async updateContact(@Param("id") id: string, @Body() dto: UpdateContactDto): Promise<{ message: string; contact: Contact }> {
    return this.contactService.updateContact(id, dto);
  }
  @Delete("/delete/:id")
  async deleteContact(@Param("id") id: string): Promise<{ message: string }> {
    return this.contactService.deleteContact(id);
  }
}
