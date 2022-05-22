export class Usuario {
  private id?: number | undefined;
  private nick: string;
  private nombre: string;
  private email: string;
  private avatar: string;
  private id_token: string;

  constructor(
    nick: string,
    nombre: string,
    email: string,
    avatar: string,
    id_token: string
  ) {
    this.nick = nick;
    this.nombre = nombre;
    this.email = email;
    this.avatar = avatar;
    this.id_token = id_token;
  }

  public get getId(): number | undefined {
    return this.id;
  }
  public set setId(value: number | undefined) {
    this.id = value;
  }
}
