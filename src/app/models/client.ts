export class Client {
    public id: number
    public nombre: string
    public rut: string
    public password: string
    constructor(id: number, nombre: string, rut: string, password: string){
        this.id=id
        this.nombre=nombre
        this.rut=rut
        this.password=password
    }
}