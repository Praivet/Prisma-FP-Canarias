import type { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service.js";

export class UserController {
  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const items = await UserService.findAll();
      res.json(items);
    } catch (error) {
      next(error);
    }
  }
  static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);
      const user = await UserService.findById(id);
      if (!user) {
        res.status(404).json({
          message: "Usuario no encontrado",
        });
        return;
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, passwordHash, firstName, lastName, isActive, failedLoginAttempts, lockedUntil } = req.body;
      if (!email || !passwordHash || !firstName || !lastName) {
        res.status(400).json({
          message: "email, passwordHash, firstName y lastName son obligatorios",
        });
        return;
      }
      const user = await UserService.create({ email, passwordHash, firstName, lastName, isActive, failedLoginAttempts, lockedUntil });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);
      const user = await UserService.findById(id);
      if (!user) {
        res.status(404).json({
          message: "Usuario no encontrado",
        });
        return;
      }
      const { email, passwordHash, firstName, lastName, isActive, failedLoginAttempts, lockedUntil } = req.body;
      await UserService.update(user, { email, passwordHash, firstName, lastName, isActive, failedLoginAttempts, lockedUntil });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);
      const user = await UserService.findById(id);

      if (!user) {
        res.status(404).json({
          message: "Usuario no encontrado",
        });
        return;
      }

      await UserService.delete(user);
      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}