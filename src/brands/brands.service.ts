import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create.brand.dto';
import { UpdateBrandDto } from './dto/update.brand.dto';

@Injectable()
export class BrandsService {
    constructor(@InjectRepository(Brand) private brandRepository: Repository<Brand>) { }

    async createBrand(dto: CreateBrandDto): Promise<{ message: string, brand: Brand }> {
        try {
            const brand = await this.brandRepository.create({ ...dto })
            if (!brand) {
                throw new Error("brand can not create");
            }
            await this.brandRepository.save(brand)
            return { message: "succesfully create brand", brand: brand }
        } catch (error) {
            throw new InternalServerErrorException("server error");
        }
    }
    async getOneBrand(id: string): Promise<{ message: string, brand: Brand }> {
        try {
            const existBrand = await this.brandRepository.findOne({ where: { id } })
            if (!existBrand) {
                throw new NotFoundException("brand not found");
            }
            return { message: "brand", brand: existBrand }
        } catch (error) {
            throw new InternalServerErrorException("server error");
        }
    }
    async getAllBrand(): Promise<{ message: string, brand: Brand[] }> {
        try {
            const existBrand = await this.brandRepository.find()
            if (!existBrand) {
                throw new NotFoundException("brand not found");
            }
            return { message: "brand", brand: existBrand }
        } catch (error) {
            throw new InternalServerErrorException("server error");
        }
    }
    async updateBrand(id: string, dto: UpdateBrandDto): Promise<{ message: string, brand: Brand }> {
        try {
            console.log('DTO:', dto);

            const existBrand = await this.brandRepository.findOne({ where: { id } })
            if (!existBrand) {
                throw new NotFoundException("brand not found");
            }
            await this.brandRepository.update(id, dto)
            const editBrand = await this.brandRepository.findOne({ where: { id } })
            if (!editBrand) {
                throw new NotFoundException("update product not found");
            }
            return { message: "succes edit", brand: editBrand }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("server error");
        }

    }
    async deleteBrand(id: string): Promise<{ message: string }> {
        try {
            const existBrand = await this.brandRepository.findOne({ where: { id } })
            if (!existBrand) {
                throw new NotFoundException("brand not found");
            }
            await this.brandRepository.remove(existBrand)
            return { message: "succesfully delete" }
        } catch (error) {
            throw new InternalServerErrorException("server error");

        }
    }

}
