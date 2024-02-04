export interface createRoleType {
  type: string;
  properties: { name: { type: string }; type: { type: string; example: string }; permissions: { type: string } };
}

export interface updateRoleType {
  type: string;
  properties: Record<string, any>;
}
