export type Role = 'admin' | 'hr' | 'manager' | 'employee' | 'finance' | 'crm';

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  admin: ['*'],
  hr: ['hrms:read','hrms:write','users:read','analytics:read','documents:read','documents:write','notifications:read'],
  manager: ['hrms:read','hrms:write','projects:read','projects:write','analytics:read','documents:read','notifications:read'],
  employee: ['hrms:read','projects:read','documents:read','notifications:read'],
  finance: ['finance:read','finance:write','analytics:read','documents:read','notifications:read'],
  crm: ['crm:read','crm:write','analytics:read','notifications:read'],
};

export function hasPermission(role: Role, permission: string): boolean {
  const perms = ROLE_PERMISSIONS[role] || [];
  return perms.includes('*') || perms.includes(permission);
}

export function hasAnyPermission(role: Role, permissions: string[]): boolean {
  return permissions.some(p => hasPermission(role, p));
}
