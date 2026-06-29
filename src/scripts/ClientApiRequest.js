//--Copyright (c) 2025-2026 Robert A. Howell

// Export function calls the server method to be performed
export default function SendRequestObjectData(data) {
    return DotNet.invokeMethodAsync('RWBDotnetTypeScript', 'ClientFetchRequest', data);
}

//GitHub Copilot Chat, 12-5-2025 for interop discussion: the below code has been generated.
// Attach to window for compatibility with existing consumers
if (typeof window !== "undefined") {
    // ensure we don't overwrite an existing implementation unintentionally
    if (typeof (window).SendRequestObjectData !== "function") {
        (window).SendRequestObjectData = SendRequestObjectData;
    }
}
