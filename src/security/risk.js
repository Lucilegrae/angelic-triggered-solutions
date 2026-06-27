// Basic placeholder risk engine for ATS Identity Core

export function computeIpRisk(ip) {
  if (!ip) return 0;

  // Example: mark localhost as safe
  if (ip.includes("127.0.0.1") || ip.includes("::1")) {
    return 0;
  }

  // Placeholder scoring logic
  return 1;
}

export function computeGeoRisk(country, city) {
  if (!country) return 0;

  // Placeholder: future anomaly detection
  return 0;
}
