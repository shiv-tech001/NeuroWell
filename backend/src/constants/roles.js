/**
 * User roles constants
 * Centralized role definitions for the application
 */

const ROLES = {
  ADMIN: 'admin',
  COUNSELOR: 'counselor',
  STUDENT: 'student'
};

/**
 * Role permissions mapping
 * Defines what each role can access
 */
const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    'manage_users',
    'manage_counselors',
    'manage_students',
    'view_all_sessions',
    'manage_platform_settings',
    'view_analytics',
    'manage_content',
    'moderate_community',
    'manage_resources',
    'system_administration'
  ],
  
  [ROLES.COUNSELOR]: [
    'view_own_profile',
    'update_own_profile',
    'view_assigned_students',
    'manage_own_sessions',
    'view_student_profiles',
    'create_session_notes',
    'manage_availability',
    'view_own_analytics',
    'access_counselor_resources',
    'participate_in_community'
  ],
  
  [ROLES.STUDENT]: [
    'view_own_profile',
    'update_own_profile',
    'book_appointments',
    'view_own_sessions',
    'browse_counselors',
    'access_resources',
    'use_self_help_tools',
    'participate_in_community',
    'view_own_progress',
    'manage_preferences'
  ]
};

/**
 * Role hierarchy for permission inheritance
 * Higher roles inherit permissions from lower roles
 */
const ROLE_HIERARCHY = {
  [ROLES.ADMIN]: 3,
  [ROLES.COUNSELOR]: 2,
  [ROLES.STUDENT]: 1
};

/**
 * Default role for new users
 */
const DEFAULT_ROLE = ROLES.STUDENT;

/**
 * Role display names for UI
 */
const ROLE_DISPLAY_NAMES = {
  [ROLES.ADMIN]: 'Administrator',
  [ROLES.COUNSELOR]: 'Counselor',
  [ROLES.STUDENT]: 'Student'
};

/**
 * Role descriptions
 */
const ROLE_DESCRIPTIONS = {
  [ROLES.ADMIN]: 'Full system access and user management capabilities',
  [ROLES.COUNSELOR]: 'Licensed mental health professional providing counseling services',
  [ROLES.STUDENT]: 'Student seeking mental health support and resources'
};

/**
 * Helper functions for role management
 */
const RoleHelpers = {
  /**
   * Check if a role is valid
   * @param {string} role - Role to validate
   * @returns {boolean} True if valid
   */
  isValidRole: (role) => {
    return Object.values(ROLES).includes(role);
  },

  /**
   * Get role permissions
   * @param {string} role - Role name
   * @returns {Array} Array of permissions
   */
  getRolePermissions: (role) => {
    return ROLE_PERMISSIONS[role] || [];
  },

  /**
   * Check if a role has a specific permission
   * @param {string} role - Role name
   * @param {string} permission - Permission to check
   * @returns {boolean} True if role has permission
   */
  hasPermission: (role, permission) => {
    const permissions = RoleHelpers.getRolePermissions(role);
    return permissions.includes(permission);
  },

  /**
   * Check if user role can access a resource based on role hierarchy
   * @param {string} userRole - User's role
   * @param {string} requiredRole - Required role for access
   * @returns {boolean} True if user has access
   */
  canAccess: (userRole, requiredRole) => {
    const userLevel = ROLE_HIERARCHY[userRole] || 0;
    const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0;
    return userLevel >= requiredLevel;
  },

  /**
   * Get all roles that are accessible by a given role
   * @param {string} role - User's role
   * @returns {Array} Array of accessible roles
   */
  getAccessibleRoles: (role) => {
    const userLevel = ROLE_HIERARCHY[role] || 0;
    return Object.keys(ROLE_HIERARCHY).filter(r => ROLE_HIERARCHY[r] <= userLevel);
  },

  /**
   * Get role display name
   * @param {string} role - Role name
   * @returns {string} Display name
   */
  getDisplayName: (role) => {
    return ROLE_DISPLAY_NAMES[role] || role;
  },

  /**
   * Get role description
   * @param {string} role - Role name
   * @returns {string} Role description
   */
  getDescription: (role) => {
    return ROLE_DESCRIPTIONS[role] || '';
  },

  /**
   * Check if role is admin
   * @param {string} role - Role to check
   * @returns {boolean} True if admin
   */
  isAdmin: (role) => {
    return role === ROLES.ADMIN;
  },

  /**
   * Check if role is counselor
   * @param {string} role - Role to check
   * @returns {boolean} True if counselor
   */
  isCounselor: (role) => {
    return role === ROLES.COUNSELOR;
  },

  /**
   * Check if role is student
   * @param {string} role - Role to check
   * @returns {boolean} True if student
   */
  isStudent: (role) => {
    return role === ROLES.STUDENT;
  },

  /**
   * Get roles that can manage a specific role
   * @param {string} targetRole - Role to be managed
   * @returns {Array} Array of roles that can manage the target role
   */
  getManagementRoles: (targetRole) => {
    const targetLevel = ROLE_HIERARCHY[targetRole] || 0;
    return Object.keys(ROLE_HIERARCHY).filter(r => ROLE_HIERARCHY[r] > targetLevel);
  }
};

/**
 * Role-based route patterns
 * Used for defining which routes are accessible by which roles
 */
const ROLE_ROUTES = {
  [ROLES.ADMIN]: [
    '/admin/*',
    '/api/admin/*',
    '/api/users/manage/*',
    '/api/analytics/*',
    '/api/system/*'
  ],
  
  [ROLES.COUNSELOR]: [
    '/counselor/*',
    '/api/counselor/*',
    '/api/sessions/manage/*',
    '/api/students/assigned/*'
  ],
  
  [ROLES.STUDENT]: [
    '/student/*',
    '/api/student/*',
    '/api/appointments/*',
    '/api/resources/*'
  ]
};

module.exports = {
  ROLES,
  ROLE_PERMISSIONS,
  ROLE_HIERARCHY,
  DEFAULT_ROLE,
  ROLE_DISPLAY_NAMES,
  ROLE_DESCRIPTIONS,
  ROLE_ROUTES,
  RoleHelpers
};