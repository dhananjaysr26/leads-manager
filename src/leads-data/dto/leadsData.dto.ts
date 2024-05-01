import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  applicant_name: string;

  @IsNumber()
  @IsNotEmpty()
  applicant_number: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  applicant_address: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  district: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  state: string;
}

export class UpdateLeadDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  applicant_name?: string;

  @IsString()
  @IsOptional()
  applicant_number?: string;

  @IsString()
  @IsOptional()
  @MaxLength(250)
  applicant_address?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  district?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  state?: string;

  @IsString()
  @IsOptional()
  @MaxLength(39)
  status?: string;

  @IsOptional()
  generated_by?: number;
}
