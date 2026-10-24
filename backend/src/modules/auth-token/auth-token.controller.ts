import type { Request, Response, NextFunction } from "express";
import { AuthTokenService } from "./auth-token.service.js";

export class AuthTokenController {
  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const items = await AuthTokenService.findAll();
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
      const authToken = await AuthTokenService.findById(id);
      if (!authToken) {
        res.status(404).json({
          message: "Token no encontrado",
        });
        return;
      }
      res.json(authToken);
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
      const { tokenHash, tokenType, expiresAt, usedAt } = req.body;
      if (!tokenHash || !tokenType || !expiresAt) {
        res.status(400).json({
          message: "tokenHash, tokenType y expiresAt son obligatorios",
        });
        return;
      }
      const authToken = await AuthTokenService.create({ tokenHash, tokenType, expiresAt, usedAt });
      res.status(201).json(authToken);
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
      const authToken = await AuthTokenService.findById(id);
      if (!authToken) {
        res.status(404).json({
          message: "Token no encontrado",
        });
        return;
      }
      const { tokenHash, tokenType, expiresAt, usedAt } = req.body;
      await AuthTokenService.update(authToken, { tokenHash, tokenType, expiresAt, usedAt });
      res.json(authToken);
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
      const authToken = await AuthTokenService.findById(id);

      if (!authToken) {
        res.status(404).json({
          message: "Token no encontrado",
        });
        return;
      }

      await AuthTokenService.delete(authToken);
      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}