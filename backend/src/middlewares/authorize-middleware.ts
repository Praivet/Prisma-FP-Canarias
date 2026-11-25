import { Request, Response, NextFunction } from "express";
import { RbacService } from "../modules/permission/rbac.service.js";

export const authorize = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    // res.locals.user: Iván's bearerAuth. res.locals.authUser.user: this branch's bearerAuth.
    const userId = res.locals.user?.id ?? res.locals.authUser?.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }
    console.log("userId", userId)

    const user = await RbacService.getUserPermissions(userId);

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const permissions = (user.roles ?? []).flatMap(role =>
      (role.permissions ?? []).map(permission => permission.code)
    );

    if (!permissions.includes(requiredPermission)) {
      res.status(403).json({ message: "Forbidden: insufficient permissions" });
      return;
    }

    next();
  };
};