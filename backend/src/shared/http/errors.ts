import { NextFunction, Request, Response } from "express";

// export function errorHandler(
//   err: any,
//   _req: Request,
//   res: Response,
//   _next: NextFunction
// ) {

//   const status = err?.status ?? 500;
//   const message = err?.message ?? "Internal Server Error";
  
//   return res.status(status).json({ error: message });
// }
// // Mejora sugerida para errorHandler
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({ 
      error: "Validation failed", 
      details: err.errors 
    });
  }
  
  if (err.message.includes("not found")) {
    return res.status(404).json({ error: err.message });
  }
  
  if (err.message.includes("Invalid PostId")) {
    return res.status(400).json({ error: err.message });
  }
  
  console.error(err);
  return res.status(500).json({ error: "Internal Server Error" });
}