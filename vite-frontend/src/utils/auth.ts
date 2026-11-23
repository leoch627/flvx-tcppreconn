import { getRoleIdFromToken, isTokenValid } from "./jwt";

/**
 * 权限工具类
 */

/**
 * 获取当前用户的token
 * @returns token
 */
export function getToken(): string | null {
  return localStorage.getItem("token");
}

/**
 * 获取当前用户的角色ID
 * @returns 角色ID
 */
export function getCurrentUserRoleId(): number | null {
  const token = getToken();

  if (!token || !isTokenValid(token)) {
    return null;
  }

  return getRoleIdFromToken(token);
}

/**
 * 判断当前用户是否是管理员
 * @returns 是否是管理员
 */
export function isAdmin(): boolean {
  const roleId = getCurrentUserRoleId();

  return roleId === 0;
}

/**
 * 判断当前用户是否已登录且token有效
 * @returns 是否已登录
 */
export function isLoggedIn(): boolean {
  const token = getToken();

  return token ? isTokenValid(token) : false;
}
