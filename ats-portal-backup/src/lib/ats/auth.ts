export function atsHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}
