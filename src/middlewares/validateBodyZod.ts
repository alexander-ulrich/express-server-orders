import type { RequestHandler } from "express";
import type { ZodObject } from "zod";

const validateBodyZod =
  (zodSchema: ZodObject): RequestHandler =>
  (req, res, next) => {
    const validation = zodSchema.safeParse(req.body);

    if (!validation.success) {
      const issues = validation.error.issues.map((issue) => ({
        path: issue.path.join(),
        message: issue.message,
      }));
      return res.status(400).json({ message: "Validation failed", issues });
    }

    req.body = validation.data;
    next();
  };

export default validateBodyZod;
