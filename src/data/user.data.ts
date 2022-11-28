import { dataSource } from "../data-source";
import { User } from "../entity/user.entity";

export class UserData {
  protected TABLE_NAME = "user";

  createUser = async (user: User) => {
    try {
      return dataSource
        .createQueryBuilder()
        .insert()
        .into(this.TABLE_NAME)
        .values(user)
        .returning(["id", "username"])
        .execute();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Database error !");
      }
    }
  };

  getUserByName = async (username: string): Promise<User> => {
    try {
      return dataSource
        .getRepository(User)
        .createQueryBuilder(`${this.TABLE_NAME}`)
        .where("user.username = :username", { username })
        .getOne();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Database error !");
      }
    }
  };

  getUserById = async (id: string): Promise<User> => {
    try {
      return dataSource
        .getRepository(User)
        .createQueryBuilder(`${this.TABLE_NAME}`)
        .where("user.id = :id", { id })
        .getOne();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Database error !");
      }
    }
  };
}
