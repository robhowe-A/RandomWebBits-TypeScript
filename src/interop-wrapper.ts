//--Copyright (c) 2025-2026 Robert A. Howell
//This file is to wrap interop calls. The code was created by GitHub Copilot Chat. 12-5-2025
//Author: Robert A. Howell

export default function SendRequestObjectData(data: any): any {
    const fn = (typeof window !== "undefined" ? (window as any).SendRequestObjectData : undefined);
    if (typeof fn !== "function") {
      throw new Error("SendRequestObjectData is not available on window at runtime.");
    }
    return fn(data);
};
