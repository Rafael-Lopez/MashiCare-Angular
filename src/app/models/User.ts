export class User {

  public username?: string;
  public password?: string;
  public authenticated?: boolean;
  public authorities?: Set<string>;

  constructor(username?: string, password?: string) {
    this.username = username;
    this.password = password;
  }

}
