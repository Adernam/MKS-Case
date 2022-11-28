import { Request, Response } from "express";
import { UserBusiness } from "../business";
import { userLogin } from "../types/user-login.type";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  signup = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const input: userLogin = {
      username,
      password,
    };

    try {
      const token = await this.userBusiness.signup(input);

      res.status(201).send({ message: "User successfully registered!", token });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(400).send("SignUp error");
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const token: string = await this.userBusiness.login({
        username,
        password,
      });

      res.status(200).send({ token });
    } catch (error: any) {
      console.log(error);
      res.status(400).send(error.sqlMessage || error.message);
    }
  };
}
