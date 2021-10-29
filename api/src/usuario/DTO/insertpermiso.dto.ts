import { IsInt, IsPositive } from "class-validator";

export class InsertPermisosDto{
    @IsInt()
    @IsPositive()
    usuario_id:number;
    @IsInt()
    @IsPositive()
    permiso_id:number;
}